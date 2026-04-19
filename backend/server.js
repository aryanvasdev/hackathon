require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const { simulateLLMResponse } = require('./services/llmService');
const {
  checkHallucination,
  checkBias,
  checkPromptRisk,
  generateFixes
} = require('./services/analysisService');

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(bodyParser.json());

app.post('/api/analyze', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ error: 'Prompt is required' });
  }

  try {
    // 1. Get Simulated LLM Response
    const responseText = await simulateLLMResponse(prompt);

    // 2. Perform Analysis
    const hallucinationData = await checkHallucination(responseText);
    const biasData = await checkBias(responseText);
    const promptRiskData = await checkPromptRisk(prompt);
    const suggestedFixes = await generateFixes(responseText, hallucinationData, biasData);

    // 3. Return Combined Payload
    res.json({
      prompt,
      response: responseText,
      analysis: {
        hallucination: hallucinationData,
        bias: biasData,
        promptRisk: promptRiskData,
        suggestedFixes
      }
    });
  } catch (error) {
    console.error('Error during analysis:', error);
    res.status(500).json({ error: 'Internal server error during analysis' });
  }
});

app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
