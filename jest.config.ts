/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  moduleFileExtensions: ['tsx', 'ts', 'jsx', 'js'],
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { module: 'esnext' }],
  },
  testMatch: ['**/*.test.(js|jsx|ts|tsx)'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  verbose: true,
  moduleDirectories: ['node_modules', 'src', 'src/apis'],
  moduleNameMapper: {
    '^src/(.*)$': '<rootDir>/$1',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  rootDir: 'src',
};
