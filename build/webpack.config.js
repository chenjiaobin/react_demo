const webpack = require('webpack')
const path = require('path')
// 打包html
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 自动打开浏览器
const OpenBrowserPlugin = require('open-browser-webpack-plugin');
// 单独打包此出css文件
const ExtractTextPlugin  = require('extract-text-webpack-plugin')
const config = require('./config.js')
const autoprefixer = require('autoprefixer')

 const webpackConfig = {
  mode: 'development',
  // entry: './src/index.js',
  entry: config.multiPage.open ? config.multiPage.entries : './src/index.js',
  output: {
    path: path.resolve('./dist'),
    filename: '[name].js',
    publicPath: '/'
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
        test: /\.(js|jsx)$/,//表示要编译的文件的类型，这里要编译的是js文件
        loader: 'babel-loader',//装载的哪些模块
        exclude: /node_modules/,//标示不编译node_modules文件夹下面的内容
        query: {//具体的编译的类型，
            compact: true,//表示不压缩
            presets: ['es2015', 'react', 'stage-0'],//我们需要编译的是es6和react,stage-0这个插件是为了解决静态属性static
            plugins: [
              ["import", {libraryName: "antd", style: "css"}],
              'react-html-attrs',// 这个是为了能在react组件中使用class添加样式而不必须使用className
              "transform-decorators-legacy"
            ] 
        }
      },
      {
        test: /\.css$/,
        exclude:[/node_modules/],
        use: [
          require.resolve('style-loader'), {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1,
              modules: true, // 新增对css modules的支持
              localIdentName: '[name]__[local]__[hash:base64:5]'
            }
          }, {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      },
      // 下面这个配置css是专门为了antd的，不使用css-module,因为在css-module的情况下antd不工作
      {
        test: /\.css$/,
        exclude:[/src/],
        use: [
          require.resolve('style-loader'), {
            loader: require.resolve('css-loader'),
            options: {
              importLoaders: 1
              // 注：这里不要设置好module:true
            }
          }, {
            loader: require.resolve('postcss-loader'),
            options: {
              ident: 'postcss',
              // postcss-flexbugs-fixes是为了修复flex布局bug的插件，autoprefixer则是自动添加浏览器前缀的插件，press是类似sass语法的插件
              plugins: () => [
                require('postcss-flexbugs-fixes'),
                autoprefixer({
                  browsers: [
                    '>1%', 'last 4 versions', 'Firefox ESR', 'not ie < 9', // React doesn't support IE8 anyway
                  ],
                  flexbox: 'no-2009'
                })
              ]
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 在下面已经添加了多页面打包
  	// new HtmlWebpackPlugin({
    //     filename: "index.html",
    //     template: "C:/Users/kevin/Desktop/react_demo/src/page/test/index.html"
    //   }),
    // 因为配置文件已经放在了build这个文件夹，webpack打包完后会自动打开浏览器
    // new OpenBrowserPlugin({ url: 'http://localhost:8080/test.html' }),
  ]
}

if (config.multiPage.open) {
  config.multiPage.templates.forEach(item => {
    const conf = {
      filename: 'index.html',
      template: item.path,
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunks: [item.name, 'manifest', 'vendor'],
      chunksSortMode: 'dependency'
    }
    webpackConfig.plugins.push(new HtmlWebpackPlugin(conf))
  })
}
 else {
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    filename: './index.html',
      template: './index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
  }))
}
module.exports = webpackConfig