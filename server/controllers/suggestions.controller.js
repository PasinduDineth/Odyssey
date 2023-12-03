const suggestionModel = require('../models/suggestionModel');
const axios = require('axios');
const apiUrl = 'http://localhost:5000/process-nlp';
/**
 * 
 * @param { userText | can be any test entered by the user } req 
   curl -X POST http://localhost:3000/get-suggestions -H "Content-Type: application/json" -d '{
   "userText": "Mouseover on #{element}"
   }'
 */

exports.getSuggestions = async (req, res) => {
  try {
    const userText = req.body.userText;
    // Validation
    if (!userText) {
        return res.status(400).json({ error: 'Invalid request parameters' });
    }

    const requestData = {
      input_text: userText,
    };
    
    axios.post(apiUrl, requestData, {
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(async response => {
        if(response.data.actions.length !== 0) {
          //Todo Sending the zeroth index for now. Need to fix.
          const scenarioMapping = await suggestionModel.getScenarios(response.data.actions[0]);
          res.status(200).json({ data: scenarioMapping });
        }
        else {
          res.status(200).json({ data: [] });
        }
      })
      .catch(error => {
        res.status(500).json({ error: 'Internal Server Error' });
      });     
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};