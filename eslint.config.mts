import {defineConfig} from 'eslint/config';
import {fixupPluginRules} from '@eslint/compat';
// @ts-ignore
import reactNative from 'eslint-plugin-react-native';

export default defineConfig({
  plugins: {
    'react-native': fixupPluginRules(reactNative),
  },
  // extends: ['plugin:react-native/all'],
  rules: {
    quotes: ['error', 'single'],
  },
});
