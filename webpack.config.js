const path = require('path');
const webpack = require('webpack');

module.exports = (env) => ({
  plugins: [
    new webpack.DefinePlugin({
      'process.env.IS_TEST_ENV': JSON.stringify(env.IS_TEST_ENV),
    }),
  ],
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.(js|ts)?$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      templates: path.resolve(__dirname, './src/templates/'),
      types: path.resolve(__dirname, './src/types'),
      utils: path.resolve(__dirname, './src/utils'),
      consts: path.resolve(__dirname, './src/consts'),
      managers: path.resolve(__dirname, './src/managers'),
    },
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
  },
});
