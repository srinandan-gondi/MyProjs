// This imports the 'axios' library which allows you to make
// HTTP requests (i.e. tool that helps you talk to other computers, which
// is OpenAI API in this case) 
const axios = require('axios');

// ChatGPT API endpoint
const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';

const API_KEY = "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";

// Function that takes a prompt as input and interacts with ChatGPT API 
async function chatWithGPT(prompt) {
    try {
        // Send a POST request to the ChatGPT API with the provided prompt
        const response = await axios.post(API_ENDPOINT, {
            prompt: prompt,
        }, {
            // Include necessary headers, including the API key for authorization
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${API_KEY}`
            }
        });

        // Extract and return the generated text from the API response
        return response.data.choices[0].text.trim();
    } catch (error) {
        // Handle errors that occur during the API request
        console.error('Error communicating with ChatGPT API', error);
        return 'Sorry, I encountered an error';
    }
}

// Export the chatWithGPT function for use in other parts of the application
module.exports = chatWithGPT;