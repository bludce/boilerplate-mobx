const merge = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const CheckDuplicatePlugin = require('duplicate-package-checker-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const autoprefixer = require('autoprefixer');
const MiniCss = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const cssNano = require('cssnano');
const baseConfig = require('./webpack.config');

const APP_PATH = '/';

module.exports = (envType, staticPath) => merge(baseConfig(envType), {
  output: {
    publicPath: envType === 'prod' ? staticPath : APP_PATH,
  },
  mode: 'production',
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
  devtool: false,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCss.loader, 'css-loader']
      },
      {
        test: /\.less$/,
        use: [
          MiniCss.loader,
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
    new CleanWebpackPlugin(),
    new MiniCss({
      filename: '[name].[contenthash].css',
      chunkFilename: '[id].[contenthash].css'
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: cssNano,
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new CheckDuplicatePlugin(),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(envType),
      PUBLIC_PATH: JSON.stringify(envType === 'prod' ? staticPath : APP_PATH),
      ROUTE_BASE: JSON.stringify(APP_PATH)
    }),
  ]
});
