import React from 'react'
import ReactDom from 'react-dom'
// import {Router, Route, hashHistory} from 'react-router'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Index from './index'


class Root extends React.Component {
	render () {
		return (
			<BrowserRouter>
				<Index/>
			</BrowserRouter>
		)
	}
}
ReactDom.render(
    <Root/>,
    document.getElementById('app')
  )
