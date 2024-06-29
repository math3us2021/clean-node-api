/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest'

const config: Config = {
  roots: ['<rootDir>/src'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'jest-environment-node',
  coverageProvider: 'v8',

  transform: {
    '^.+\\.tsx?$': 'ts-jest'
  }

  // // Adicione esta linha para garantir que Jest processe arquivos de módulo ES (se necessário)
  // transformIgnorePatterns: [
  //   '/node_modules/'
  // ]
}

export default config
