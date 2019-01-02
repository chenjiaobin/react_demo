import React, { PureComponent } from 'react'
import { ContextProvider } from './provider'
import GrandFather from './grandfather'

export default class Index extends PureComponent {
  render () {
    return (
      <ContextProvider context={{
        propA: 'propA',
        propB: 'propB'
      }}>
        <GrandFather/>
      </ContextProvider>
    )
  }
}