const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');
const autoprefixer = require('autoprefixer');
const baseConfig = require('./webpack.config');
require('dotenv').config();

module.exports = (envType) => merge(baseConfig(envType), {
  mode: 'development',
  stats: {
    assets: true,
    colors: true,
    errors: true,
    errorDetails: true,
    modules: false,
    performance: true,
    hash: false,
    version: false,
    timings: true,
    warnings: true,
    children: false
  },
  devtool: 'source-map',
  devServer: {
    writeToDisk: true,
    contentBase: path.resolve('dist'),
    port: process.env.PORT || 5000,
    hot: true,
    historyApiFallback: true,
    watchOptions: {
      poll: true
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
              modules: true,
              localIdentName: '[path][local]--[hash:base64:5]',
              camelCase: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [autoprefixer({ remove: false })]
            }
          },
          {
            loader: 'less-loader',
            options: {
              sourceMap: false,
              paths: [path.resolve('src')]
            }
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.png$/,
        use: 'file-loader',
        exclude: /node_modules/
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        issuer: {
          test: /\.tsx?$/
        },
        use: [{
          loader: 'ts-loader',
          options: {
            transpileOnly: true,
            configFile: path.resolve('tsconfig.webpack.json'),
          }
        }, '@svgr/webpack', 'url-loader']
      },
      {
        test: /\.svg$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            mimetype: 'image/svg+xml',
            esModule: false
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(envType),
      PUBLIC_PATH: JSON.stringify('/'),
      ROUTE_BASE: JSON.stringify('/')
    }),
  ]
});
