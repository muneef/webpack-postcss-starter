const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm

// const parts = require('./webpack.parts');

const extractPost = new ExtractTextPlugin({
    filename: "[name].css",
    disable: process.env.NODE_ENV === "development"
});

const PATHS = {
  app: path.join(__dirname, 'assets/templates'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
    context: path.resolve(__dirname, 'assets'),
    entry:'./src/webpack.entry.js',
    output: {
      path: path.resolve(__dirname, './built'),
      filename: 'bundle.js',
      // publicPath: '/image/'
    },
    devtool: 'inline-source-map',
    devServer: {
      contentBase: './dist',
      hot: true,
      port: 9000
    },
    module: {
      rules: [
        {
          test: /\.css$/, 
          exclude: /node_modules/,
          use: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                localIdentName: '[local]'
              }
            },
            'postcss-loader'
          ]
        })
        },        
        {
          test:/\.pug$/,
          use: ['raw-loader', 'pug-html-loader']
        },
        {
          test: /\.(png|svg|jpg)$/,
          use: [
            {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[ext]',
              },              
            }
          ]
        },
      ]
    },
    plugins: [
        extractPost,
        // parts.loadPug(),
        new HtmlWebpackPlugin({
          title: 'Hot Module Replacement',
          template: 'templates/index.pug'
        }),
        // new webpack.LoaderOptionsPlugin({
        //     options: {
        //       context: __dirname,
        //       postcss: [ autoprefixer ]
        //     }
        // }),
        new webpack.HotModuleReplacementPlugin()
        // new UglifyJSPlugin()
    ],
};