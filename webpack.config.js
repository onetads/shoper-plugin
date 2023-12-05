const path = require('path');

module.exports = {
  entry: { plugin: './src/index.ts', config: './src/config.ts' },
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
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};
