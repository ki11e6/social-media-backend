import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest', //project uses TypeScript and Jest should use the 'ts-jest'
  testEnvironment: 'node', // Specifies the test environment to use
  verbose: true, // set to true, Jest will display detailed test run information in the console
  coverageDirectory: 'coverage', //set to 'coverage,' which is a common location for storing coverage reports.
  collectCoverage: true, //set to true, Jest will collect code coverage information during test runs.
  testPathIgnorePatterns: ['/node_modules/'], //specify which test files or directories should be ignored
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  }, // configured to use 'ts-jest' to transform TypeScript files ('.ts' and '.tsx')
  testMatch: ['<rootDir>/src/**/test/*.ts'], // specify which files Jest should consider as test files
  collectCoverageFrom: ['src/**/*.ts', '!src/**/test/*.ts?(x)', '!**/node_modules/**'], // includes all '.ts' files under the 'src' directory but excludes any '.ts' files within a 'test' directory and any files in 'node_modules.'
  coverageThreshold: {
    global: {
      branches: 1,
      functions: 1,
      lines: 1,
      statements: 1
    }
  }, //thresholds that your code must meet for the test run to be considered successful. In this case, it sets a global threshold of 100%
  coverageReporters: ['text-summary', 'lcov'], //coverage report formats Jest will generate in both a text-summary report and an lcov report
  moduleNameMapper: {
    '@auth/(.*)': ['<rootDir>/src/features/auth/$1'],
    '@user/(.*)': ['<rootDir>/src/features/user/$1'],
    '@post/(.*)': ['<rootDir>/src/features/post/$1'],
    '@reaction/(.*)': ['<rootDir>/src/features/reactions/$1'],
    '@comment/(.*)': ['<rootDir>/src/features/comments/$1'],
    '@global/(.*)': ['<rootDir>/src/shared/globals/$1'],
    '@service/(.*)': ['<rootDir>/src/shared/services/$1'],
    '@socket/(.*)': ['<rootDir>/src/shared/sockets/$1'],
    '@worker/(.*)': ['<rootDir>/src/shared/workers/$1'],
    '@root/(.*)': ['<rootDir>/src/$1']
  }
};

export default config;
