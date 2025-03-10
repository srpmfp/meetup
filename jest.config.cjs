module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.jsx?$': 'babel-jest', // Transform JavaScript and JSX files using Babel
    },
    moduleNameMapper: {
        '\\.(css|less|scss|sass)$': 'identity-obj-proxy', // Mock CSS imports
    },
    moduleFileExtensions: ['js', 'jsx'],
    setupFilesAfterEnv: ['<rootDir>/setupTests.js'], // Path to the setup file
    collectCoverage: true,
     collectCoverageFrom: [
      '**/*.{js,jsx}',
      '!**/node_modules/**',
      '!**/vendor/**',
      '!./auth-server/**',
      '!./coverage/**',
'!**/node_modules/**',
'!**/vendor/**'    ],
    
  coverageDirectory: 'coverage',
coverageReporters: ['json', 'lcov', 'text', 'clover']
  
};  