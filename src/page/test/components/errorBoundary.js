import { React, Component } from 'react'


// 错误边界
// 如果一个 class 组件中定义了 static getDerivedStateFromError() 或 componentDidCatch() 这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hasError: false
    }
  }
  // 如果这个组件包含的子组件有错误的话，那么就会渲染出备用UI
  static getDerivedStateFromError (error) {
    // update state so the next render will show the faceback ui
    return { hasError: true }
  }

  // 这个生命周期主要是用来打印出报错信息
  componentDidCatch(err, info) {
    logErrorToMyService(err, info)
  }

  render() {
    if (this.state.hasError) {
      return <h1>something is wrong</h1>
    }
    return this.props.children
  }
}