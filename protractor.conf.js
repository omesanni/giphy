exports.config = {
  framework: 'mocha',
  seleniumServerJar: './node_modules/selenium-server-standalone-jar/jar/selenium-server-standalone-3.13.0.jar',
  baseUrl: `http://localhost:${process.env.PORT || 3000}`,
  specs: ['e2e/**/*.test.js'],
  onPrepare: () => {
    browser.ignoreSynchronization = true;
    browser.driver.manage().window().maximize();

    require('./tasks/setupe2eTests'); // eslint-disable-line
  },
  allScriptsTimeout: 15000,
};
