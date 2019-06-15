const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',

};

module.exports = {
  externals: {
    paths: PATHS,
  },

  entry: {
    app: PATHS.src,
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '/',
  },
  // devtool: 'source-map',
  // // devServer: {
  // //   contentBase: path.join(__dirname, 'dist'),
  // //   compress: true,
  // //   port: 9000,
  //  // },
  module: {
    rules: [
      // { enforce: 'pre', test: /\.js$/, loader: 'eslint-loader' },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader',
        },
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules',
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          // name: 'qwe/[name].[ext]',
          name: `${PATHS.assets}img/[name].[ext]`,
        },
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`,
    }),
    new CopyWebpackPlugin([
      // { from: './src/**/*.png', to: `${PATHS.assets}img` },
      // { from: `${PATHS.src}/qqq`, to: `${PATHS.assets}img` },
      {
        from: `${PATHS.src}/components/header/assets/img`,
        to: `${PATHS.assets}img`,
      },
      // { from: `${PATHS.src}/static`, to: '' },
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
    }),
  ],
};
