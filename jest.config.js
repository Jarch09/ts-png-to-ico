module.exports = {
  roots: [
    "<rootDir>/src",
  ],
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
  testEnvironment: 'node',
  moduleNameMapper: {
    "^@src\/(.*)$": "<rootDir>/src/$1",
  },
  modulePaths: [
    "<rootDir>/src",
  ],
  moduleFileExtensions: [
    'ts',
    'js',
    'json'
  ],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
};
