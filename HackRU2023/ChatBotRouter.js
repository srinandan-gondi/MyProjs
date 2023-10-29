const express = require('express');
const router = express.Router();
const axios = require('axios');

const API_ENDPOINT = 'https://api.openai.com/v1/engines/davinci-codex/completions';
const API_KEY = 'YOUR_OPENAI_API_KEY';

router.post('/api/chatbot', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await axios.post(API_ENDPOINT, {
      prompt: prompt,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      }
    });

    const botResponse = response.data.choices[0].text.trim();
    res.json(botResponse);
  } catch (error) {
    console.error('Error communicating with ChatGPT API', error);
    res.status(500).json('Sorry, I encountered an error');
  }
});

module.exports = router;