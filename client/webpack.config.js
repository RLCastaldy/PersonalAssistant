const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const { InjectManifest, GenerateSW } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: '../src/js/index.js',
      install: '../src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new GenerateSW(),
      new HtmlWebpackPlugin({
        template: './index.html',
        title: 'TODOs List'
      }),
      new WebpackPwaManifest({

      }),
      new MiniCssExtractPlugin(),
      new InjectManifest({
        swSrc: './src/service-worker.js',
            swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, 'css-loader'],
        },
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
