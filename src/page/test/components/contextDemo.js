import React, { Component } from 'react'
import {ThemeContextTP} from './contextTP'
import { Button } from 'antd'

export default class ContexDemo extends Component {
  constructor() {
    super()
  }
  componentDidMount () {
    console.log('季度杀回房间')
    console.log(this.context)
  }
  // 可以通过class.contextType(这个属性名字必须是这个)属性被重新赋值为一个ThemeContextTP创建的context对象，这样我们可以直接通过this.context来消费Context的值
  // 可以在任何生命周期中访问他，包括render
  static contextType = ThemeContextTP
  
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