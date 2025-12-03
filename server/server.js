const express = require('express');
const cors = require('cors');
const logger = require('./middlewares/logger');
const indexRoute = require('./routes/index');
const bodyParser = require('body-parser');
const nlpService = require('./utils/nlpService');

const app = express();
const port = 3000;

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(bodyParser.json());

// Middleware
app.use(logger);

// Routes
app.use('/', indexRoute);

// Initialize NLP Service
nlpService.initialize()
  .then(() => {
    console.log('✅ NLP Service ready');
  })
  .catch(error => {
    console.error('❌ Failed to initialize NLP Service:', error.message);
    console.log('Run: python server/utils/nlp/generate_embeddings.py');
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
