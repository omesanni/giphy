module.exports = {
  setupFiles: ['jest-localstorage-mock'],
  setupTestFrameworkScriptFile: '<rootDir>/tasks/setupUnitTests.js',
  collectCoverageFrom: ['src/**/*.{js,jsx}'],
  testURL: 'http://testing',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx}',
  ],
  globals: {
    SEARCH_API: '',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$': '<rootDir>/src/__mocks__/fileMock.js',
  },
};
