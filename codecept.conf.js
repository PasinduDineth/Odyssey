const { setHeadlessWhen, setCommonPlugins } = require('@codeceptjs/configure');
// turn on headless mode when running with HEADLESS=true environment variable
// export HEADLESS=true && npx codeceptjs run
setHeadlessWhen(process.env.HEADLESS);

// enable all common plugins https://github.com/codeceptjs/configure#setcommonplugins
setCommonPlugins();

/** @type {CodeceptJS.MainConfig} */
exports.config = {
  tests: './tests/**/*_test.js',
  output: './output',
  helpers: {
    Playwright: {
      browser: 'chromium',
      url: 'http://localhost',
      show: false
    }
  },
  include: {
    I: './steps_file.js',
    // Include all tests in the acceptance folder
    acceptance: './tests/acceptance/*_test.js',
    
    // Include all tests in the api folder
    api: './tests/api/*_test.js',
    
    // Include all tests in the ui folder
    ui: './tests/ui/*_test.js',
  },
  name: 'odyssey'
}