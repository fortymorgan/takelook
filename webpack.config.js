const path = require('path');
 
module.exports = {
  entry: './js/takelook.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'static/dist')
  },
  devtool: 'eval',
};
