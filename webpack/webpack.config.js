const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');
const package = require('../package.json');

const PATHS = {
  src: path.resolve(__dirname, '../src'),
  public: path.resolve(__dirname, '../public'),
  dist: path.resolve(__dirname, '../dist'),
};

const htmlMinify = {
  removeComments: true,
  preserveLineBreaks: true,
  collapseWhitespace: true,
  removeRedundantAttributes: true,
  useShortDoctype: true,
  removeEmptyAttributes: true,
  removeStyleLinkTypeAttributes: true,
  keepClosingSlash: true,
  minifyJS: true,
  minifyCSS: true,
  minifyURLs: true,
};

module.exports = (envType) => ({
  entry: {
    app: path.resolve(PATHS.src, 'index.tsx')
  },
  output: {
    filename: 'index.bundle.js',
    chunkFilename: 'chunk-[name].[contenthash].js',
    path: path.resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    modules: ['node_modules', 'src'],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.css'],
    alias: {
      icons: path.resolve('src', 'icons'),
      styles: path.resolve('src', 'styles'),
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|ts)x?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        loader: {
          loader: 'ts-loader',
          options: {
            configFile: path.resolve('tsconfig.webpack.json'),
          }
        },
        exclude: /node_modules/,
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(PATHS.public, 'index.html'),
      favicon: path.resolve(PATHS.public, 'favicon.png'),
      minify: htmlMinify,
    }),
    new PreloadWebpackPlugin({
      rel: 'preload',
      include: 'initial',
    }),
  ],
  optimization: {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
      maxAsyncRequests: 30,
      maxInitialRequests: Infinity,
      minSize: 0,
      cacheGroups: {
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
          name: 'default',
        },
        reactBundle: {
          test: /[\\/]node_modules[\\/](react|react-dom|react-redux|redux|react-router)[\\/]/,
          name: 'reactBundle'
        },
        reactTableBundle: {
          test: /[\\/]node_modules[\\/](react-table)[\\/]/,
          name: 'reactTableBundle'
        },
        loldashBundle: {
          test: /[\\/]node_modules[\\/](lodash)[\\/]/,
          name: 'lodashBundle'
        },
        vendors: {
          test: /[\\/]node_modules[\\/](!react)(!react-dom)(!lodash)/,
          name: 'vendor',
          chunks: 'all',
          priority: -10,
        }
      }
    }
  },
});
