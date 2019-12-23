import React from 'react'
import { Context } from './context'

class Child extends React.Component {
  componentDidMount () {
    console.log(this.context)
  }
  render() {
    return (
      <div>
        <p>{this.context.name}</p>
        <p>{this.context.age}</p>
        <button onClick={this.context.toggle}>按我</button>
      </div>
    )
  }
}

Child.contextType = Context

export default Child