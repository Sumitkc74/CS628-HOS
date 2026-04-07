const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.content || "Please provide a message.";

  try {
    const axiosResponse = await axios({
      method: 'post',
      url: 'http://localhost:11434/api/generate',
      data: {
        model: 'gemma2:2b',
        prompt: userMessage,
      },
      responseType: 'stream', 
    });

    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    axiosResponse.data.on('data', (chunk) => {
      res.write(`data: ${chunk.toString()}\n\n`);
    });

    axiosResponse.data.on('end', () => {
      res.write('data: {"done": true}\n\n');
      res.end();
    });

    axiosResponse.data.on('error', (err) => {
      console.error('Stream error:', err);
      res.end();
    });

  } catch (error) {
    console.error('Error connecting to Ollama:', error.message);
    
    if (!res.headersSent) {
      res.status(500).json({ 
        error: 'Ollama connection failed', 
        details: error.message 
      });
    } else {
      res.end();
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
