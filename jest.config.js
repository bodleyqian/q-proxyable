module.exports = {
  testEnvironment: 'node',
  collectCoverage: true,
  coverageDirectory: './_coverage/',
  coveragePathIgnorePatterns: ['<rootDir>/node_modules/'],
  // setupTestFrameworkScriptFile: './test/utils/setup',
  // testPathIgnorePatterns: ['test/fixtures/.*/.*?/'],
  expand: true,
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/(src|test)/.*(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
};
