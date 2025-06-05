const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
require('dotenv').config(); 

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);


const chatHistory = [];

router.post('/generate-itinerary', async (req, res) => {
  let { prompt: promptInput } = req.body; 

  try {
    let promptText;
    if (typeof promptInput !== 'string') {
      promptText = JSON.stringify(promptInput, null, 2);
    } else {
      promptText = promptInput;
    }

   
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' }); 

    const generationRequest = {
      contents: [{ role: "user", parts: [{ text: promptText }] }]

    };

    chatHistory.push({ role: 'user', parts: [{ text: promptText }] });

    const result = await model.generateContent(generationRequest);
    
    const response = result.response;
    
    if (!response) {
        console.error('Gemini API error: No response object found in the result.');
        return res.status(500).json({
            error: 'Gemini API error',
            details: 'No response object returned from the API.',
        });
    }

    const generatedText = response.text();

    chatHistory.push({ role: 'model', parts: [{ text: generatedText }] });

    res.json({ text: generatedText });

  } catch (error) {
    console.error('Gemini API error:', error);
    let errorMessage = 'Gemini API error';
    let errorDetails = error.message;

    if (error.response && error.response.data) {
        errorDetails = JSON.stringify(error.response.data);
    } else if (error.message.includes('API key not valid')) {
        errorMessage = 'Invalid API Key';
        errorDetails = 'Please check your GEMINI_API_KEY environment variable.';
    } else if (error.message.includes('fetch')) {
        errorMessage = 'Network error or issue reaching Gemini API';
        errorDetails = `Failed to fetch. ${error.message}`;
    }


    res.status(500).json({
      error: errorMessage,
      details: errorDetails,
    });
  }
});

module.exports = router;
