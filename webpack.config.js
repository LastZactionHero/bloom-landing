const webpack = require('webpack'); //to access built-in plugins
const path = require('path');

module.exports = {
  entry: './js_src/app.js',
  output: {
    path: path.resolve(__dirname, 'site/assets'),
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,         // Match both .js and .jsx files
        exclude: /node_modules/,
        loader: "babel-loader",
        query:
          {
            presets:["react"]
          }
      }
      // {test: /\.(js|jsx)$/, use: 'babel-loader'}
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin()
  ]
};
