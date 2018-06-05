import React from 'react'

export default class BodyChild extends React.Component {
	render () {
		return (
			<div>
				我是body的儿子<input type="text" onChange={this.props.handlerChangeAge}/>
				<p>我是父组件通过...props获取过来的数据{this.props.userId} {this.props.country} {this.props.sex}</p>
			</div>
		)
	}
}