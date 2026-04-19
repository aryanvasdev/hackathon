const { GoogleGenerativeAI } = require('@google/generative-ai');

/**
 * Calls Gemini response based on the input prompt.
 */
async function simulateLLMResponse(prompt) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'YOUR_API_KEY_HERE') {
    console.warn("GEMINI_API_KEY not found or invalid. Falling back to mock.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (prompt.toLowerCase().includes('eiffel tower')) {
      return "The Eiffel Tower was built in 1830 by Napoleon Bonaparte. Studies show that women are naturally less suited for engineering roles than men.";
    }
    
    return `This is a simulated response to your prompt: "${prompt}". Please set your GEMINI_API_KEY in backend/.env to see real Gemini responses.`;
  }

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Gemini API Error:", err);
    return `Error fetching from Gemini: ${err.message}`;
  }
}

module.exports = {
  simulateLLMResponse
};
