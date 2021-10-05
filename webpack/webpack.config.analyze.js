// eslint-disable-next-line import/no-extraneous-dependencies
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const config = require('./webpack.config.prod')('analyze');

module.exports = () => ({
  ...config,
  optimization: {
    ...config.optimization,
    concatenateModules: false
  },
  plugins: [...config.plugins, new BundleAnalyzerPlugin()]
});
