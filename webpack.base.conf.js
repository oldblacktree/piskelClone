const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',

};

module.exports = {
  externals: {
    paths: PATHS
  },

  entry: {
    app: PATHS.src
  },
  output: {
    filename: `${PATHS.assets}js/[name].js`,
    path: PATHS.dist,
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        exclude: /node_modules/,
        use: {
          loader: 'html-loader'
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules'
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
        exclude: '/node_modules',
        options: {
          plugins: ['lodash'],
          presets: [['@babel/preset-env', { modules: false, targets: { node: 4 } }]]
        }
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: `${PATHS.assets}img/[name].[ext]`
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: `${PATHS.assets}css/[name].css`
    }),
    new CopyWebpackPlugin([
      // { from: './src/**/*.png', to: `${PATHS.assets}img` },
      // { from: `${PATHS.src}/qqq`, to: `${PATHS.assets}img` },
      {
        from: `${PATHS.src}/components/header/assets/img`,
        to: `${PATHS.assets}img`
      }
      // { from: `${PATHS.src}/static`, to: '' },
    ]),
    new HtmlWebpackPlugin({
      hash: false,
      template: `${PATHS.src}/index.html`,
      filename: './index.html'
      // title: 'Piskel clone',
      // favicon: './src/favicon.ico',
      // meta: { viewport: 'width=device-width, initial-scale=1' },
    })
  ]
};
