exports.config = {
  framework: 'mocha',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: `http://localhost:${process.env.PORT || 3000}`,
  specs: ['e2e/**/*.test.js'],
  onPrepare: () => {
    browser.ignoreSynchronization = true;
    browser.driver.manage().window().maximize();

    require('./tasks/setupe2eTests');
  },
  allScriptsTimeout: 15000,
}
