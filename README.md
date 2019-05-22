## React脚手架
1. 全局安装脚手架 `npm install -g create-react-app`
2. 用脚手架初始化项目 `create-react-app react_demo`
3. 脚手架项目主要依赖 react react-dom  react-scripts
4. 项目的webpack配置以及项目基本所需依赖都已经在 react-scritps自动安装好了，如果我们需要额外配置webpack配置和依赖，比如配置antd的按需加载，我们可以通过`npm run eject`暴露配置(执行这条命令之前先提交一下你的修改，不然不让你暴露)，这时候就和平时的开发没有区别。执行完之后就会在项目里面多出config和scripts两个文件夹，项目里是没有.babelrc这个文件的。所以需要把配置放到 webpack.config.js 或 package.json 的 babel 属性中。也可以使用react-app-rewired(一个对create-react-app进行自定义配置的社区解决方案)和babel-plugin-import(一个babel管理加载的插件)
```
npm install react-app-rewired --dev
npm install babel-plugin-import --dev
// 修改package.json的配置
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test --env=jsdom",
}
// 在项目根目录创建一个 config-overrides.js 用于修改默认配置
const { injectBabelPlugin } = require('react-app-rewired');
module.exports = function override(config, env) {
  config = injectBabelPlugin(['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }], config);
  return config;
}
```
5. 线上编译命令：这个是create-react-app的一个大亮点，它能让你的应用骗译出在线上生产环境运行的代码，编译出来的文件很小，且文件名还带hash值，方便我们做cache，而且它还提供一个服务器，让我们在本地也能看到线上生产环境类似的效果，真的超级方便
```
npm run build
<!-- 运行下面两条命令，可以查看线上生产环境的运行效果。 -->
npm install -g pushstate-server
pushstate-server build
```
6. 跨域请求接口时只需要在package.json里面加个配置项` "proxy": "http://localhost:3001/" `
7. 注意使用ant-design这个ui框架的时候，需要单独配置一个css-loader,因为ant不能和css-modules混用，详细请看本项目`build/webpack.config.js`配置
8. 项目中的serviceWorker.js文件用来做离线缓存的新的api实现。其工作原理是缓存同源路径下的请求，相当于是在前端与后端数据中加了一个缓存层，使得在离线状态下也能够正常访问部分页面。如果想让registerServiceWorker.js生效，服务器必须采用https协议

## 安装依赖
npm install
## 启动项目
npm run dev
## 组件两大类(展示组件和容器组件)
- 容器组件特征：
1. 负责管理数据和业务逻辑，不负责 UI 的呈现
2. 带有内部状态
3. 使用 Redux 的 API

- 展示组件特征：
1. 只负责 UI 的呈现，不带有任何业务逻辑
2. 所有数据都由参数（this.props）提供
3. 不使用任何 Redux 的 API

- webpack
1. path.resolve()和path.join()的区别
```
path.resolve()方法可以将多个路径解析为一个规范化的绝对路径。其处理方式类似于对这些路径逐一进行cd操作，与cd操作不同的是，这引起路径可以是文件，并且可不必实际存在
path.resolve('foo/bar', '/tmp/file/', '..', 'a/../subfile')
相当于
cd foo/bar
cd /tmp/file/
cd ..
cd a/../subfile
pwd

path.join()方法可以连接任意多个路径字符串，并且也会对路径进行规范化，要连接的多个路径可做为参数传入
path.join('/foo', 'bar', 'baz/asdf', 'quux', '..')
'/foo/bar/baz/asdf' 
```
两者之间的对比
```
const path = require('path'); 
let myPath = path.join(__dirname,'/img/so'); 
let myPath2 = path.join(__dirname,'./img/so'); 
let myPath3 = path.resolve(__dirname,'/img/so'); 
let myPath4 = path.resolve(__dirname,'./img/so'); 
console.log(__dirname); //D:\myProgram\test 
console.log(myPath); //D:\myProgram\test\img\so 
console.log(myPath2); //D:\myProgram\test\img\so 
console.log(myPath3); //D:\img\so<br> 
console.log(myPath4); //D:\myProgram\test\img\so
```
## VScode编辑器配置tab键自动补全标签
* 按住`ctrl+shift+p`
* 选择setting.json
* 添加一下配置就行了
```
"emmet.includeLanguages": {
"javascript": "javascriptreact"
}
```
## React-redux
1. react-redux主要工作的两件事就是a.将store传入根组件的context,以便子组件可以用;b通过subscribe订阅store的变化
2. provider接收从redux而来的store,以便传递给子组件使用
3. connect高阶组件(即接收一个函数返回一个函数，高阶函数则是传入一个函数或者返回函数满足任何一个都可以)，可以传递四个参数mapStateProps(取store传递给组件)、mapDispatchToProps(改变store的数据)、mergeProps(对上面的两个结构进一步处理)、options(一些配置项)

## 组件嵌套组件

```
父组件嵌套子组件
<Grid>
  <Row />
  <Row />
  <Row />
</Grid>
```
Grid组件里面可以通过this.props.children获取到传递过来的所有任何类型的(字符串、数组等)子组件，但是当我们想要对传递过来的子组件进行循环操作的时候，如果不是数组的话就会报错，那我们我们可以通过React.Children来循环操作，这样无论传递过来的组件是什么都不会报错，也可以通过React.Children.count(this.props.children)来计算子组件的个数，而不要直接通过thi.props.children.length来计算
```
class IgnoreFirstChild extends React.Component {
  render() {
    const children = this.props.children
    return (
      <div>
        {React.Children.map(children, (child, i) => {
          if (i < 1) return
          return child
        })}
      </div>
    )
  }
}
```
当我们想要父组件嵌套的子组件只有一个的时候我们可以通过`React.Children.only(this.props.children)()`来渲染，这样只会返回一个child。如果不止一个child，它就会抛出错误
## 生命周期
注：由于未来采用**异步**渲染机制，所以即将在17版本中去掉的生命周期钩子函数
* componentWillMount
* componentWillRecieveProps
* componentWIllUpdate

### 新增两个
* static getDerivedStateFromProps
会在初始化和update触发，用于替换componentWillReceiveProps,可以用来控制props更新state的过程，它返回一个对象便是新的state,如果不需要更新，返回null
* getSnapshotBeforeUpdate 用于替换componentWillUpdate,改函数会在update后DOM更新前被调用，它使得组件能在发生更改之前从 DOM 中捕获一些信息（例如，滚动位置），返回值将作为componentDidUpdate的第三个参数
```
class A extends React.Component {
  // 用于初始化 state
  constructor() {}
  // 用于替换 `componentWillReceiveProps` ，该函数会在初始化和 `update` 时被调用
  // 因为该函数是静态函数，所以取不到 `this`
  // 如果需要对比 `prevProps` 需要单独在 `state` 中维护
  static getDerivedStateFromProps(nextProps, prevState) {}
  // 判断是否需要更新组件，多用于组件性能优化
  shouldComponentUpdate(nextProps, nextState) {}
  // 组件挂载后调用
  // 可以在该函数中进行请求或者订阅
  componentDidMount() {}
  // 用于获得最新的 DOM 数据
  getSnapshotBeforeUpdate() {}
  // 组件即将销毁
  // 可以在此处移除订阅，定时器等等
  componentWillUnmount() {}
  // 组件销毁后调用
  componentDidUnMount() {}
  // 组件更新后调用
  componentDidUpdate(prevProps, prevState, snapshot) {}
  // 渲染组件函数
  render() {}
  // 以下函数不建议使用
  UNSAFE_componentWillMount() {}
  UNSAFE_componentWillUpdate(nextProps, nextState) {}
  UNSAFE_componentWillReceiveProps(nextProps) {}
}
```
## 生命周期执行顺序
**首次渲染**
1. father constructor
2. father getDerivedStateFromProps
3. father render
4. children constructor
5. children getDerivedStateFromProps
6. children render
7. children componentDidMount
8. father componentDidMount

**父组件数据修改触发重渲染**
1. father getDerivedStateFromProps
2. father shouldComponentUpdate
3. father render
4. children getDerivedStateFromProps
5. children shouldComponentUpdate
6. children render
7. children getSnapshotBeforeUpdate
8. father getSnapshotBeforeUpdate
9. children componentDidUpdate, snapshot: 1
10. father componentDidUpdate, snapshot: 1

## 按需加载react-router
> 第一种
1. 第一步: 安装 babel-plugin-syntax-dynamic-import,并在.babelrc中配置
2. 第二步: 安装 react-loadable
3. 第三步: 开始使用

```
import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

import App from 'containers';

// 按路由拆分代码
import Loadable from 'react-loadable';
const MyLoadingComponent = ({ isLoading, error }) => {
    // Handle the loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }
    // Handle the error state
    else if (error) {
        return <div>Sorry, there was a problem loading the page.</div>;
    }
    else {
        return null;
    }
};
const AsyncHome = Loadable({
    loader: () => import('../containers/Home'),
    loading: MyLoadingComponent
});
const AsyncCity = Loadable({
    loader: () => import('../containers/City'),
    loading: MyLoadingComponent
});
const AsyncDetail = Loadable({
    loader: () => import('../containers/Detail'),
    loading: MyLoadingComponent
});
const AsyncSearch = Loadable({
    loader: () => import('../containers/Search'),
    loading: MyLoadingComponent
});
const AsyncUser = Loadable({
    loader: () => import('../containers/User'),
    loading: MyLoadingComponent
});
const AsyncNotFound = Loadable({
    loader: () => import('../containers/404'),
    loading: MyLoadingComponent
});

// 路由配置
class RouteMap extends React.Component {
    render() {
        return (
            <Router history={history}>
                <App>
                    <Switch>
                        <Route path="/" exact component={AsyncHome} />
                        <Route path="/city" component={AsyncCity} />
                        <Route path="/search/:category/:keywords?" component={AsyncSearch} />
                        <Route path="/detail/:id" component={AsyncDetail} />
                        <Route path="/user" component={AsyncUser} />
                        <Route path="/empty" component={null} key="empty" />
                        <Route component={AsyncNotFound} />
                    </Switch>
                </App>
            </Router>
        );
    }
}
```
> 第二种
 在router3中的按需加载方式，route3中实现按需加载只需要按照下面代码的方式实现就可以了
 ```
 const about = (location, cb) => {
    require.ensure([], require => {
      cb(null, require('../Component/about').default)
    },'about')
  }
  <Route path="helpCenter" getComponent={about} />
 ```
**注意**：在router4以前，我们是使用getComponent的的方式来实现按需加载，getComponent是异步的，只有在路由匹配时才会调用,router4中，getComponent方法已经被移除，所以这种方法在router4中不能使用。
> 第三种
React 16.6添加了一个新的特性: React.lazy(), 它可以让代码分割(code splitting)更加容易

React.Suspense是一个新添加到核心React库中的功能，他的功能基本和  react-loadable 一致，所以不用多说，让我们来看看用 React.Suspense 替换 react-loadable
```
const johanComponent = React.lazy(() => import(/* webpackChunkName: "johanComponent" */ './myAwesome.js'));
 
export const johanAsyncComponent = props => (
  <React.Suspense fallback={<Spinner />}>
    <johanComponent {...props} />
  </React.Suspense>
);
```
到此，其实我们已经实现了和 react-loadable 一样的功能。或许细心的你可能发现了，React.Suspense 没有 delay 参数。是的， React.Suspense 没有在内置支持 delay 功能，因此，即使加载工程只需要几毫秒的时间， fallback也会被执行，就上述代码来说，也就是 Spinner 会闪烁一下，如果资源被加载得非常快得话。就目前而言，我们需要自己在 fallback 得组件中自行处理这些逻辑，例如在 componentDidMount 中设置一个定时器，使其直到将来的某个时间才呈现

**这里还有一个小问题**
用户在第一次加在时，会展示"Loading...."的回退方案的组件。这是因为App需要等待浏览器加载好<johanComponent />的代码。
如果我们想避免展示"Loading...."这样的loading状态，我们需要在提前加载好代码。
一个简单实现预加载代码的方式就是提前调用React.lazy()
```
const stockChartPromise = import("./myAwesome.js");
const StockChart = React.lazy(() => stockChartPromise);
```
当我们调用dynamic imoprt时，组件就会开始加载，并且它不会阻塞其他组件的加载。
注意：React.lazy目前只支持默认导出的组件（export default）
* [reactV16.6按需加载](https://juejin.im/post/5c31a45df265da61193bfc7e)
* [reactV16.6按需加载2](https://cloud.tencent.com/developer/article/1381296)
## 路由
[react-router4跟之前版本的变化](https://www.jianshu.com/p/bf6b45ce5bcc)
1. v4的版本去掉了<IndexRoute>，新添加了exat

## 高阶组件HOC
1. 不要在Render中使用HOC，React 的 diff 算法（称为协调）使用组件标识来确定它是应该更新现有子树还是将其丢弃并挂载新子树。 如果从 render 返回的组件与前一个渲染中的组件相同（===），则 React 通过将子树与新子树进行区分来递归更新子树。 如果它们不相等，则完全卸载前一个子树
```
// 这种做法是不可行的，这不仅仅是性能问题 - 重新挂载组件会导致该组件及其所有子组件的状态丢失
render() {
  // 每次调用 render 函数都会创建一个新的 EnhancedComponent
  // EnhancedComponent1 !== EnhancedComponent2
  const EnhancedComponent = enhance(MyComponent);
  // 这将导致子树每次渲染都会进行卸载，和重新挂载的操作！
  return <EnhancedComponent />;
}
```
在极少数情况下，你需要动态调用 HOC。你可以在组件的生命周期方法或其构造函数中进行调用
2. 不要改变原始组件，使用组合方式替换，详情见[官网](https://react.docschina.org/docs/higher-order-components.html)

## 好用，但不常用之API
* [React.memo](https://react.docschina.org/docs/react-api.html)，它与 React.PureComponent 非常相似，但它适用于函数组件，但不适用于 class 组件

## HOOK（v16.8才开始支持）
> 什么是HOOK

Hook 是一些可以让你在函数组件里“钩入” React state 及生命周期等特性的函数。Hook 不能在 class 组件中使用 —— 这使得你不使用 class 也能使用 React
> 什么时候使用HOOK
如果你在编写函数组件并意识到需要向其添加一些 state，以前的做法是必须将其它转化为 class。现在你可以在现有的函数组件中使用 Hook。

前言及注意：使用的话需要升级React相关的库的版本(React、react-dom等)，只能在函数里面使用，不可在class里面使用，将原本class的一些周期函数封装成API，可以用HOOK取代class，但是官网也建议先不要替换，还有部分暂时无法替代的，比如暂时还没有对应不常用的`getSnapshotBeforeUpdate` 和` componentDidCatch` 生命周期的 Hook 等价写法,目前 Hook 还处于早期阶段，一些第三方的库可能还暂时无法兼容 Hook

## react后续版本
React 16.x的两大新特性 Time Slicing, Suspense
React 16.6：支持代码拆分的 Suspense 组件（已经发布）
React 16.7：React Hooks（~ 2019 年 Q1）
React 16.8：并发模式（~ 2019 年 Q2）
React 16.9：支持数据提取的 Suspense 组件（~ 2019 年年中）

