import React from 'React'
import ReactDom from 'react-dom'
import { Link } from 'react-router-dom'
import store from '../Redux/Store/store'
import { Provider } from 'react-redux'
import ControlPannel from './controlPannel'

// 注意：组件必须export出来，在其他地方才可以使用
export default class ComponentHeader extends React.Component {
	render () {
		return (
			<Provider store={store}>
			<div>
				<h1>这是头部{this.props.name}</h1>
				<ul>
					<li><Link to="/">首页</Link></li>
					<li><Link to="/goods/123">测试</Link></li>
				</ul>
			<ControlPannel></ControlPannel>
			</div>
			</Provider>
		)
	}
}