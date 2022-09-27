module.exports = {
  roots: [
    "<rootDir>/src",
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@src\/(.*)$": "<rootDir>/src/$1",
  },
  modulePaths: [
    "<rootDir>/src",
  ],
  setupFiles: [
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
};
