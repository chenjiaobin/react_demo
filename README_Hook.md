## HOOK的动机
* 更方便的实现状态逻辑复用，以往都是通过高阶组件和render prop实现的
* 更统一的组织代码，比如以往监听需要在componentDidMount监听，在组件销毁的时候再componentWillUnMount清除，这样会混乱，通过useEffect可以解决这个问题

## HOOK是什么
HOOK就是通过勾入React的state和生命周期等的特性，使得函数也可以有状态

## 注意事项
* HOOK只能用在函数的最外层，不要在循环、条件或嵌套函数中调用（因为HOOK的正确执行是依靠它的顺序）
* HOOK不能用在Class
* 可以有多个useState和多个useEffect
* React会等待浏览器完成画面渲染之后才延迟调用useEffect

## 自定义HOOK
* 实现了以前在react组件中无法灵活共享状态逻辑的问题
* 函数必须以use开头，这样调用的时候react才知道这个函数包含了HOOK，才会去检测是否有违反规则，自定义HOOK在多个地方调用的state是相互隔离的

## 请求一般写在useEffect
https://react.docschina.org/docs/hooks-faq.html#is-there-something-like-instance-variables
```
useEffect(() => {
  const req = async () => {
    await axios()
  }
  req()
})
```