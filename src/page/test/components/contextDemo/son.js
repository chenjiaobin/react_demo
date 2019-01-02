import React, { PureComponent } from 'react'
import { injectContext } from './provider'

// 这种是注解的方式来获取值，需要安装babel-plugin-transform-decorators-legacy这个npm包
@injectContext(['propA', 'propB'])
export default class Son extends PureComponent {
  render () {
    return (
      <div>
        <p>{ this.props.propA }</p>
        <p>{ this.props.propB }</p>
      </div>
    )
  }
}