import React, { Component } from 'react'
import {ThemeContextTP} from './contextTP'


export default class ContexDemo extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <span style={{ background: this.props.contextColor }}>测试</span>
        <ThemeContextTP.Consumer>
          {temp => <span style={{background: temp}}>我是制度将</span>}
        </ThemeContextTP.Consumer>
      </div>
    )
  }
}