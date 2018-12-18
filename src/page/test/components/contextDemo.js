import React, { Component } from 'react'
import {ThemeContextTP} from './contextTP'
import { Button } from 'antd'

export default class ContexDemo extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <div>
        <span style={{ background: this.props.contextColor }}>测试</span>
        <ThemeContextTP.Consumer>
          {({colorT, methodT}) => (
            <div>
              <span style={{background: colorT}}>我是制度将</span>
              <Button type="primary" onClick={methodT}>Primary</Button>
            </div>
          )}
        </ThemeContextTP.Consumer>
      </div>
    )
  }
}