import React from 'react'
import Child from './child'
import {Context} from './context'

export default class MyContext extends React.Component {
    toggle = () => {
      this.setState(pre => {
        return { age: pre.age + 1 }
      })
    }

    state = {
      name: '哈哈',
      age: 18,
      toggle: this.toggle
    }


  render() {
    return (
      <Context.Provider value={this.state}>
        <Child></Child>
      </Context.Provider>
    )
  }
}