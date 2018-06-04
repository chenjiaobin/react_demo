import React from 'react'

export default class ComponentBody extends React.Component {

	// 在子类继承中是没有这个getInitialState的钩子的，在React.createClass就有
	// getInitialState () {
	// 	console.log('这是初始化数据')
	// }
	
	constructor (props) {
		super (props)
		// 在这种继承的方式创建组件有this.state代替getInitialState
		this.state = {
			name: '刘亦菲'
		}
	}

	componentWillMount() {
		console.log('componentWillMount');
	}

	componentDidMount() {
		console.log('componentDidMount')
	}

	render () {
		var userName = '张三丰&nbsp;后裔'

		return (
				<div>
					{/*jsx的注释写法，下面这个danger是为了将userName的&nbsp转换成空格，这个要防止代码注入的问题。也可以通过将空格转换成unicode来进行显示*/}
					这是<p dangerouslySetInnerHTML = {{__html:userName}}></p>
					<p>{this.state.name}</p>
				</div>	
			)
	}
}