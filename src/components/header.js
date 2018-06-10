import React from 'React'
import ReactDom from 'react-dom'
import { Link } from 'react-router-dom'


// 注意：组件必须export出来，在其他地方才可以使用
export default class ComponentHeader extends React.Component {
	render () {
		return (
			<div>
				<h1>这是头部{this.props.name}</h1>
				<ul>
					<li><Link to="/">首页</Link></li>
					<li><Link to="/goods/123">测试</Link></li>
				</ul>
			</div>
		)
	}
}