const path = require('path');

module.exports = {
  context: path.resolve(__dirname, 'src'),
  entry: './js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'client-bundle.js'
  },

  module:{
      rules:[{
        test: /\.js$/,
        exclude: [/node_modules/],
        use: [{
            loader: 'babel-loader',
            options: { presets: ['@babel/preset-env'] },
        }]
      }]
  },

  devServer: {
      contentBase: path.resolve(__dirname, './dist'),
      compress: true,
      port: '3000',
  }
};