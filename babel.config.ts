import type {TransformOptions} from '@babel/core';

const config: TransformOptions = {
  presets: ['@babel/preset-typescript', 'module:@react-native/babel-preset'],
  plugins: [
    'hot-updater/babel-plugin',
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@': './src',
        },
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
        ],
      },
    ],
  ],
};

export default config;
