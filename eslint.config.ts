import {defineConfig} from 'eslint/config';
import {fixupPluginRules} from '@eslint/compat';
import reactNative from 'eslint-plugin-react-native';
import tseslint from 'typescript-eslint';

const reactNativeGlobals =
  reactNative.environments?.['react-native']?.globals ?? {};
const reactNativeAllRules = reactNative.configs?.all?.rules ?? {};

export default defineConfig([
  {
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      'react-native': fixupPluginRules(reactNative),
    },
    files: ['**/*.{ts,tsx,js,jsx}'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: reactNativeGlobals,
    },
    rules: {
      ...reactNativeAllRules,
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-imports': 'error',
      'react-native/no-inline-styles': 'off',
      'react-native/no-color-literals': 'off',
      quotes: ['error', 'single'],
    },
  },
]);
