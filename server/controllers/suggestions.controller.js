const nlpService = require('../utils/nlpService');

/**
 * Get test scenario suggestions based on user input
 * @param {Object} req - Request object with userText in body
 * @param {Object} res - Response object
 */
exports.getSuggestions = async (req, res) => {
  try {
    const { userText } = req.body;
    
    if (!userText || !userText.trim()) {
      return res.status(400).json({ error: 'User text is required' });
    }

    // Find similar scenarios using pure Node.js NLP service
    const results = await nlpService.findSimilar(userText);
    
    return res.status(200).json({ data: results });
    
  } catch (error) {
    console.error('Suggestions Error:', error.message);
    
    if (error.message.includes('not initialized')) {
      return res.status(503).json({ 
        error: 'NLP service not ready. Please wait for initialization.' 
      });
    }
    
    return res.status(500).json({ error: 'Internal server error' });
  }
};