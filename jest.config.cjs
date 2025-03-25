/** @type {import('jest').Config} */

const config = {
    "testEnvironment": 'jest-environment-jsdom',
    "preset": "jest-puppeteer",
    "transform": {
        '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript and JSX files using Babel
    },
    "moduleNameMapper": {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    "moduleFileExtensions": ['js', 'jsx'],
    "setupFilesAfterEnv": ['<rootDir>/setupTests.js'], // Path to the setup file
    "collectCoverage": true,
    "collectCoverageFrom": [
        '**/*.{js,jsx}',
        '!**/node_modules/**',
        '!**/vendor/**',
        '!./auth-server/**',
        '!./coverage/**',
        '!**/node_modules/**',
        '!**/vendor/**'],

    "coverageDirectory": 'coverage',
    "coverageReporters": ['json', 'lcov', 'text', 'clover']

};
module.exports = config