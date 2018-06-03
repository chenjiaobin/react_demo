import React from 'React'
import ReactDom from 'react-dom'


// 注意：组件必须export出来，在其他地方才可以使用
export default class ComponentHeader extends React.Component {
	render () {
		return (
				<h1>这是头部</h1>
			)
	}
}