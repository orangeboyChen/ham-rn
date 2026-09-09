const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */
const path = require('path');
const config = {
  resolver: {
    extraNodeModules: {
      '@': path.resolve(__dirname, 'src'),
    },
    blockList: [
      /scripts\/.*/,
      // Only block the hand-written embed sources, not the `generated/`
      // directory. Metro crawls directories before files, so a pattern that
      // also matches `embed/generated` would prune the whole subtree and
      // break resolution of the generated bundles.
      /src\/business\/education\/scorecalc\/embed\/[^/]+\.tsx?$/,
    ],
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
