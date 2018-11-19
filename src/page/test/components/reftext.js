import React, { Component } from 'react'
import ContextDemo from './contextDemo'

// 在createContext里面传入的这个参数是当consumer没有被provider包含的时候显示的默认值即现在的theme值，当有provider的时候就不会用到这一个值，用的是
const ThemeContext = React.createContext('red')

// 因为如果我们深度嵌套的组件想要更新context的值，可以通过context向下传递一个函数，以允许consumer更新context
const ThemeContextDy = React.createContext({
  theme: 'orange',
  toggleTheme: () => {}
})

export default class RefText extends Component {
  constructor(){
    super()
    this.toggleTheme = () => {
      this.setState(state => ({
        contextData: {
          theme: state.contextData.theme == 'red' ? 'green' : 'red',
          toggleTheme: this.toggleTheme,
        }
      }))
    }
    this.state = {
      contextData: {
        theme: 'green',
        toggleTheme: this.toggleTheme,
      }
    }
  }
  render () {
    return (
      <div>
        <p ref={this.props.refInput}>我是子组件被父组件通过回调ref获取到</p>
        <ThemeContext.Provider value="blue">
          <ThemeContext.Consumer>
            {theme => <span style={{background: theme}}>我是来测试react的context的</span>}
          </ThemeContext.Consumer>
        </ThemeContext.Provider>
        {/* 动态更改context的值 */}
        <ThemeContextDy.Provider value={this.state.contextData}>
          <ThemeContextDy.Consumer>
            {({theme, toggleTheme}) => (
              <div>
                <span style={{background: theme}}>测得</span>
                <ContextDemo contextColor={theme}></ContextDemo>
                <button onClick={toggleTheme}>动态更新context的值</button>
              </div>
            )}
          </ThemeContextDy.Consumer>
        </ThemeContextDy.Provider>
      </div>
    )
  }
}