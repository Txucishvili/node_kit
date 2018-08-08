const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const sassPlugin = new MiniCssExtractPlugin({
  filename: "[name].css",
  chunkFilename: "[name].css"
});

const htmlPlugin = new HtmlWebPackPlugin({
  template: './src/index.html',
  filename: './index.html'
});


module.exports = {
  entry: {
    app: './src/app.js',
    main: './src/main.js',
    style: './src/sass/style.scss',
    lib: './src/sass/libs.scss',
    vendor: ['jquery']
  },
  output: {
    filename: '[name].bundle.js',
    chunkFilename: "['name'].bundle.js",
    path: path.resolve(__dirname, 'dist')
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].css',
              outputPath: './css',
              sourceMap: true
            }
          },
          {
            loader: 'extract-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [htmlPlugin]
};