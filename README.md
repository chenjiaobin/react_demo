
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
