const fs = require('fs');
const path = require('path');
const { getTestRoot } = require('codeceptjs/lib/command/utils');

// curl -X POST http://localhost:3000/create-test -H "Content-Type: application/json" -d '{
//   "featureName": "YourFeatureName",
//   "scenarioName": "YourScenarioName",
//   "testSteps": ["I.amOnPage(\"https://google.com\")", "I.see(\"google\")"],
//   "fileName": "YourFileName"
// }'

exports.createTest = (req, res) => {
  const testRoot = getTestRoot();
  try {
    const featureName = req.body.featureName;
    const scenarioName = req.body.scenarioName;
    const testSteps = req.body.testSteps;
    const fileName = req.body.fileName;
  
    // Validation
    if (!featureName || !scenarioName || !Array.isArray(testSteps) || testSteps.length === 0 || !fileName) {
        return res.status(400).json({ error: 'Invalid request parameters' });
    }

    const testContent = `
    Feature('${featureName}');
    Scenario('${scenarioName}', async ({ I }) => {
    ${testSteps.join('\n  ')}
    });
    `;

    const testFilePath = path.join(testRoot, `${fileName}_test.js`);
    fs.writeFileSync(testFilePath, testContent);
    res.json({ message: 'Test file created successfully' });
  } catch (error) {
    console.log("err", error)
    res.status(500).json({ error: error });
  }
};