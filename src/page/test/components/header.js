import React from 'React'
import ReactDom from 'react-dom'
import { Link } from 'react-router-dom'
import store from '@/Redux/Store/store'
import { Provider } from 'react-redux'
import ControlPannel from './controlPannel'
import RouterTest from './routerTest'
import RouterTest2 from './routerTest2'

// 注意：组件必须export出来，在其他地方才可以使用
export default class ComponentHeader extends React.Component {
	render () {
		return (
			<Provider store={store}>
			<div>
				<h1>这是头部{this.props.name}</h1>
				{/* hidden属性通常表明该节点是不相关的，浏览器将不会渲染具有这个属性的元素。而React并不会对这个属性做任何特殊处理(但在未来的版本中可能会较低优先级处理被隐藏的组件) */}
				<p hidden={true}>测试hidden属性</p>
				<ul>
					<li><Link to="/">首页</Link></li>
					<li><Link to="/goods/123">测试</Link></li>
					<li><Link to="/renderProp">RenderProps的应用</Link></li>
				</ul>
			<ControlPannel></ControlPannel>
			<RouterTest></RouterTest>
			<RouterTest2></RouterTest2>
			</div>
			</Provider>
		)
	}
}