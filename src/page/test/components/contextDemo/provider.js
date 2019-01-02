import React, { Component } from 'react';

// 创建一个容器congtext
export const Context = React.createContext()

export class ContextProvider extends Component {
  render () {
    return (
      <Context.Provider value={ this.props.context }>
        { this.props.children }
      </Context.Provider>
    )
  }
}

// 用注解的方式给子组件注入属性
// 下面这种两个箭头的其实就是，一个函数返回一个函数在返回一个组件包裹器而已
// 第一个箭头的contexts就是我们在son组件使用@injectContext时传入的参数，即@injectContext(['proA','proB'])
// 第二个箭头的RealComponet其实就是@injectContext(['proA','proB'])(Son)，因为只要Decorator后面是class，默认就已经把Class当成参数隐形传进Decorator了，而我们的@injectContext是加在son这个class组件上面的，
// 所以RealCompoent其实就是son这个组件
// https://www.jianshu.com/p/275bf41f45cf
// https://juejin.im/post/5c26c7f7e51d4511fb7da3ca?utm_source=gold_browser_extension

export const injectContext = (contexts) => RealComponent => {
  return class extends Component {
    render() {
      return (
        <Context.Consumer>
          {context => {
              // 将顶层的context分发到各层
              let mapContext = {};
              if(Array.isArray(contexts)) {
                contexts.map(item => {
                  mapContext[item] = context[item];
                });
              }
              return (
                <RealComponent {...mapContext} {...this.props} />
              )
            }
          }
        </Context.Consumer>
      );
    }
  };
};