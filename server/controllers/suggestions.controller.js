const suggestionModel = require('../models/suggestionModel');

/**
 * 
 * @param { actionType | wait | verify | store ect } req 
   curl -X POST http://localhost:3000/get-suggestions -H "Content-Type: application/json" -d '{
   "actionType": "wait"
   }'
 */

exports.getSuggestions = async (req, res) => {
  try {
    const actionType = req.body.actionType;
    // Validation
    if (!actionType) {
        return res.status(400).json({ error: 'Invalid request parameters' });
    }
    const scenarioMapping = await suggestionModel.getScenarios(actionType);
    res.status(200).json({ data: scenarioMapping });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};