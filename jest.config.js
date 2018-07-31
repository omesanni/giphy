module.exports = {
  setupFiles: ['jest-localstorage-mock'],
  setupTestFrameworkScriptFile: '<rootDir>/tasks/setupTests.js',
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
  collectCoverageFrom: [
    '!src/*.{js,jsx}',
    '!src/store/*.js',
    'src/**/*.{js,jsx}',
  ],
  coverageThreshold: {
    'src/**/*.{js,jsx}': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
};
