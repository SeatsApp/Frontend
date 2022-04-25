module.exports = {
    preset: 'react-native',
    transform: {
      '^.+\\.js$': require.resolve('react-native/jest/preprocessor.js'),
    },
    "collectCoverage": true,
    "collectCoverageFrom": [
      "src/**/*.(tsx|ts|js)",
      "App.js"
    ],
    "testResultsProcessor": "jest-sonar-reporter",
  };