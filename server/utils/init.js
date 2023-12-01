const { codecept: Codecept } = require('codeceptjs');
const { getTestRoot } = require('codeceptjs/lib/command/utils');

const Initialize = () =>{
    const config = {
        helpers: {
          Playwright: {
            browser: 'chromium',
            url: 'http://localhost',
            show: false
          }
        },
        include: {
          I: './steps_file.js'
        }
        };
      const opts = { steps: true };
      const testRoot = getTestRoot();
      const codecept = new Codecept(config, opts);
      codecept.init(testRoot);
}
module.exports = Initialize;