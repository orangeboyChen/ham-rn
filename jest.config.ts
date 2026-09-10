import type {Config} from '@jest/types';

/**
 * Packages that ship ESM-only builds. Jest runs CJS by default, so these must
 * be transformed. Nested copies (`color` -> `color-string` -> `color-convert`)
 * need their own allowlist, since the nested path is not covered by the
 * top-level `node_modules/(...)` pattern.
 */
const ESM_DEPS = [
  'color',
  'color-string',
  'color-convert',
  'color-name',
  'simple-swizzle',
  'is-arrayish',
  'cheerio',
  'i18next',
  'react-i18next',
].join('|');

const config: Config.InitialOptions = {
  preset: '@react-native/jest-preset',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  testMatch: ['<rootDir>/__tests__/**/*.test.ts?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/android/', '/ios/'],
  transformIgnorePatterns: [
    `node_modules/(?!(@react-native|react-native|@preeternal|${ESM_DEPS})/)`,
    `node_modules/(${ESM_DEPS})/node_modules/(?!(${ESM_DEPS})/)`,
  ],
};

export default config;
