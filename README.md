
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
* getSnapshotBeforeUpdate 用于替换componentWillUpdate,改函数会在update后DOM更新前被调用，用于读取最新的DOM数据，返回值将作为componentDidUpdate的第三个参数
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
  componentDidUpdate() {}
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

