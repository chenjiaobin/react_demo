import React, { Component } from 'react'

export default class RefText extends Component {
  constructor(){
    super()
  }
  render () {
    return (
      <div>
        <p ref={this.props.refInput}>我是子组件被父组件通过回调ref获取到</p>
      </div>
    )
  }
}