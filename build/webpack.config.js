var webpack = require('webpack')
var path = require('path')
// 打包html
var HtmlWebpackPlugin = require('html-webpack-plugin');
// 自动打开浏览器
var OpenBrowserPlugin = require('open-browser-webpack-plugin');
// 单独打包此出css文件
var ExtractTextPlugin  = require('extract-text-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: 'bundle.js',
    // publicPath: '/'
  },
  devtool: 'eval-source-map',
  devServer: {
  	port: 8080,
  	contentBase: './src', //src文件夹里面的内容改变就会重新打包
  	historyApiFallback: true,
  	hot: true,
  	inline: true
  },
  resolve: {
    alias: {
      "@": path.resolve("src")
    }
  },
  module: {
    rules: [
      {
        test: /\.js?$/,//表示要编译的文件的类型，这里要编译的是js文件
        loader: 'babel-loader',//装载的哪些模块
        exclude: /node_modules/,//标示不编译node_modules文件夹下面的内容
        query: {//具体的编译的类型，
            compact: true,//表示不压缩
            presets: ['es2015', 'react', 'stage-0'],//我们需要编译的是es6和react,stage-0这个插件是为了解决静态属性static
            plugins: ['react-html-attrs'] // 这个是为了能在react组件中使用class添加样式而不必须使用className
        }
      },
      {
        test: /\.css?$/,
        loader: 'style-loader!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ]
  },
  plugins: [
  	new HtmlWebpackPlugin({
  		title: "This is the result",
        filename: "./index.html",
        template: "./index.html"
      }),
    // 因为配置文件已经放在了build这个文件夹，webpack打包完后会自动打开浏览器
    // new OpenBrowserPlugin({ url: 'http://localhost:8080' }),
  ]
}