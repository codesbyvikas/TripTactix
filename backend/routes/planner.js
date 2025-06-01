const { GoogleGenerativeAI } = require('@google/generative-ai');
const express = require('express');
require('dotenv').config(); // Ensure you have a .env file with GEMINI_API_KEY

const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Optional: In-memory chat history (for demonstration)
// Note: For production, this should be stored persistently and per-session.
const chatHistory = [];

router.post('/generate-itinerary', async (req, res) => {
  let { prompt: promptInput } = req.body; // Renamed to avoid conflict with prompt string

  try {
    // Ensure promptInput is a string (stringify if it's an object)
    let promptText;
    if (typeof promptInput !== 'string') {
      promptText = JSON.stringify(promptInput, null, 2);
    } else {
      promptText = promptInput;
    }

    // Get the Gemini model
    // Ensure the model name is correct and available.
    // For chat-like interactions or when specifying roles, gemini-pro is often used.
    // gemini-1.5-flash is a fast multi-modal model.
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash-latest' }); // Using latest flash model

    // Prepare the content for the API call
    // The Gemini API expects an array of Content objects
    const generationRequest = {
      contents: [{ role: "user", parts: [{ text: promptText }] }]
      // Optionally, you can add system instructions or few-shot examples here if needed:
      // systemInstruction: { role: "system", parts: [{text: "You are an expert travel planner."}]},
      // contents: [
      //   { role: "user", parts: [{text: "Previous user message"}]},
      //   { role: "model", parts: [{text: "Previous model response"}]},
      //   { role: "user", parts: [{ text: promptText }] }
      // ]
    };

    // Add user's prompt to chat history (optional, for context tracking)
    // To be consistent with SDK's Content structure
    chatHistory.push({ role: 'user', parts: [{ text: promptText }] });

    // Call the model to generate content
    const result = await model.generateContent(generationRequest);
    
    // Extract the response
    // result is GenerateContentResult, result.response is GenerateContentResponse
    const response = result.response;
    
    if (!response) {
        console.error('Gemini API error: No response object found in the result.');
        return res.status(500).json({
            error: 'Gemini API error',
            details: 'No response object returned from the API.',
        });
    }

    // The text() method on GenerateContentResponse returns the aggregated text.
    const generatedText = response.text();

    // Save model's response to chat history (optional)
    // To be consistent with SDK's Content structure
    chatHistory.push({ role: 'model', parts: [{ text: generatedText }] });

    // Return the generated itinerary text
    res.json({ text: generatedText });

  } catch (error) {
    console.error('Gemini API error:', error);
    let errorMessage = 'Gemini API error';
    let errorDetails = error.message;

    // Check for specific API error structures if available
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
      // It can be helpful to see what was sent if there's a persistent error
      // sentPrompt: promptText // Be cautious about logging sensitive data
    });
  }
});

// Example of how to use this router in your app.js or server.js
// const express = require('express');
// const app = express();
// const itineraryRouter = require('./path-to-this-router-file'); // Assuming this code is in its own file
//
// app.use(express.json()); // Middleware to parse JSON bodies
// app.use('/api', itineraryRouter); // Mount the router
//
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

module.exports = router;
