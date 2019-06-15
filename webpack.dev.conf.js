const webpack = require('webpack');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: 'development',
  devServer: {
    contentBase: baseWebpackConfig.externals.paths.dist,
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].map',
    }),
  ],
});

module.exports = new Promise((resolve, reject) => {
  resolve(devWebpackConfig);
});
