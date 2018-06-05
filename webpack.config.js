var webpack = require('webpack')
var path = require('path')
// 打包html
var HtmlWebpackPlugin = require('html-webpack-plugin');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: path.join(__dirname,'/src/index.js'),
  output: {
    path: path.join(__dirname + '/build'),
    filename: 'bundle.js'
  },
  devtool: 'eval-source-map',
  devServer: {
  	port: 8080,
  	contentBase: './src', //src文件夹里面的内容改变就会重新打包
  	historyApiFallback: true,
  	hot: true,
  	inline: true
  },
  module: {
    rules: [
      {
        test: /\.js?$/,//表示要编译的文件的类型，这里要编译的是js文件
        loader: 'babel-loader',//装载的哪些模块
        exclude: /node_modules/,//标示不编译node_modules文件夹下面的内容
        query: {//具体的编译的类型，
            compact: true,//表示不压缩
            presets: ['es2015', 'react', 'stage-0']//我们需要编译的是es6和react,stage-0这个插件是为了解决静态属性static
        }
      }
    ]
  },
  plugins: [
  	new HtmlWebpackPlugin({
  		title: "This is the result",
        filename: "./index.html",
        template: "./index.html"
  	}),
    new OpenBrowserPlugin({ url: 'http://localhost:8080' })
  ]
}