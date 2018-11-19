import React, { Component } from 'react'

export default class ContexDemo extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <span style={{ background: this.props.contextColor }}>测试</span>
      </div>
    )
  }
}