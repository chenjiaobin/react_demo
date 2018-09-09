const config = require('./config.js')
const HtmlWebpackPlugin = require('html-webpack-plugin');

if (config.multiPage.open) {
    var temp = []
    config.multiPage.templates.forEach(item => {
      const conf = {
        filename: item.name + '.html',
        template: item.path,
        // inject: true,
        // minify: {
        //   removeComments: true,
        //   collapseWhitespace: true,
        //   removeAttributeQuotes: true
        // },
        // chunks: [item.name, 'manifest', 'vendor'],
        // chunksSortMode: 'dependency'
      }
      temp.push(new HtmlWebpackPlugin(conf))
    })
  }

  module.exports= temp