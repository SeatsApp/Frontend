// eslint-disable-next-line no-undef
module.exports = {
  testEnvironment: "jsdom",
  preset: "jest-expo",
  globals: {
    "ts-jest": {
      tsconfig: {
        jsx: "react"
      }
    }
  },
  transform: {
    "^.+\\.js$": "<rootDir>/node_modules/react-native/jest/preprocessor.js",
    "^.+\\.tsx?$": "ts-jest"
  },
  moduleNameMapper: {
    "\\.(css|less|scss)$": "identity-obj-proxy"
  },
  collectCoverage: true,
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/coverage/**",
    "!**/node_modules/**",
  ],
  testResultsProcessor: "jest-sonar-reporter",
  moduleFileExtensions: [
    "js",
    "ts",
    "tsx"
  ],
  transformIgnorePatterns: [
    'node_modules/(?!@react-native|react-native|expo-secure-store|expo-modules-core|@react-navigation|expo-web-browser)'
  ],
  coverageReporters: [
    "json-summary",
    "text",
    "lcov"
  ]
};