const fs = require('fs');
const path = require('path');
const { getTestRoot } = require('codeceptjs/lib/command/utils');
const event = require('codeceptjs').event;
const setupCodecept = require('../utils/init')
const getTestTypes = require('../utils/testTypes')

// Initialize CodeceptJS
const codecept = setupCodecept();

/**
  curl -X POST http://localhost:3000/create-test -H "Content-Type: application/json" -d '{
  "featureName": "YourFeatureName",
  "scenarioName": "YourScenarioName",
  "testSteps": ["I.amOnPage(\"https://google.com\")", "I.see(\"google\")"],
  "fileName": "YourFileName",
  "testType": "UI"
}'
*/
// @TODO: Need to separate the types of testing and put into the emptyFolder. Ex: API/UI

exports.createTest = (req, res) => {
  const testRoot = getTestRoot();
  try {
    const featureName = req.body.featureName;
    const scenarioName = req.body.scenarioName;
    const testSteps = req.body.testSteps;
    const fileName = req.body.fileName;
    const testType = req.body.testType;
    // Validation
    if (!featureName || !testType || !scenarioName || !Array.isArray(testSteps) || testSteps.length === 0 || !fileName) {
        return res.status(400).json({ error: 'Invalid request parameters' });
    }

    const testContent = `
    Feature('${featureName}');
    Scenario('${scenarioName}', async ({ I }) => {
    ${testSteps.join('\n  ')}
    });
    `;

    const testFilePath = path.join(testRoot, `./tests/${getTestTypes(testType)}/${fileName}_test.js`);
    fs.writeFileSync(testFilePath, testContent);
    res.json({ message: 'Test file created successfully' });
  } catch (error) {
    console.log("err", error)
    res.status(500).json({ error: error });
  }
};

/** curl -X POST   -H "Content-Type: application/json"   -d '{"testSuite": "login_test.js"}'   http://localhost:3000/run-test */
// @TODO curl is passing a file name. But route is running all tests.

exports.runTests = async(req, res) => {
  const testRoot = getTestRoot();
  try {
    await codecept.bootstrap();
    // codecept.loadTests('./login_test.js');
    codecept.loadTests('./**/*_test.js');

    let testResults = [];
    event.dispatcher.on(event.test.after, (test) => {
        testResults = testResults.concat({title: test.title, state: test.state, file: test.file, uid: test.uid, startedAt: test.startedAt, duration: test.duration, speed: test.speed})
    });
    event.dispatcher.on(event.all.after, () => {
        res.status(200).json({ results: testResults });
    });
    await codecept.run();
    // const resultsString = circularJSON.stringify({ results: testResults });
  } catch (error) {
    console.log("error", error)
    res.status(500).json({ error: error });
  }
};