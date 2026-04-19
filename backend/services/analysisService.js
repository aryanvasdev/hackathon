async function checkHallucination(text) {
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Static mock based on the image provided
  return {
    score: 38,
    riskLabel: 'High risk',
    confidence: 62
  };
}

async function checkBias(text) {
  await new Promise(resolve => setTimeout(resolve, 400));
  
  return {
    score: 31,
    riskLabel: 'Gender bias',
    severity: 69
  };
}

async function checkPromptRisk(prompt) {
  await new Promise(resolve => setTimeout(resolve, 300));
  
  return {
    level: 'Low',
    riskLabel: 'Safe to process',
    riskIndex: 12
  };
}

async function generateFixes(text, hallucinationData, biasData) {
  await new Promise(resolve => setTimeout(resolve, 200));

  return [
    {
      id: 1,
      type: 'hallucination',
      description: 'Replace "1830" with "1889" — verified via Wikidata knowledge graph'
    },
    {
      id: 2,
      type: 'hallucination',
      description: 'Replace "Napoleon Bonaparte" with "Gustave Eiffel" — verified via RAG retrieval'
    },
    {
      id: 3,
      type: 'bias',
      description: 'Remove gender bias claim — no credible source supports this. Suggest neutral rewording.'
    }
  ];
}

module.exports = {
  checkHallucination,
  checkBias,
  checkPromptRisk,
  generateFixes
};
