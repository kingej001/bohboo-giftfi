const webpack = require('webpack');

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "buffer": require.resolve("buffer"),
    "process": require.resolve("process/browser"),
    "util": require.resolve("util"),
  };

  config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ];

  // Exclude node_modules from source-map-loader
  const sourceMapRule = config.module.rules.find(rule => rule.oneOf);
  if (sourceMapRule) {
    sourceMapRule.oneOf = sourceMapRule.oneOf.map(oneRule => {
      if (oneRule.use && oneRule.use.find(use => use.loader && use.loader.includes('source-map-loader'))) {
        oneRule.exclude = [/node_modules/];
      }
      return oneRule;
    });
  }

  return config;
};