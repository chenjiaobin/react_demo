import React from 'react'
import PropTypes from 'prop-types'
import ReactDom from 'react-dom'
import BodyChild from './bodyChild.js'
// 这个是es6使用mixin的时候才会用到的
import ReactMixin from 'react-mixin'
import mixinLog from './mixin'

export default class ComponentBody extends React.Component {

	// 在子类继承中是没有这个getInitialState的钩子的，在React.createClass就有
	// getInitialState () {
	// 	console.log('这是初始化数据')
	// }
	constructor (props) {
		super (props) //调用基类的所有的初始化方法
		// 在这种继承的方式创建组件有this.state代替getInitialState
		this.state = {
			name: '刘亦菲',
			age: 0
		}
		this.changeName = this.changeName.bind(this)
	}

	// 注意：使用这个static的时候需要安装babel-preset-stage-0插件
	// 如果父组件没有传递指定的值过来，我们可以通过这个方式设置，默认值
	static defaultProps = {
		country: '这是默认值'
	}

	componentWillMount() {
		console.log('componentWillMount');
	}

	componentDidMount() {
		console.log('componentDidMount')
	}

	// onClick事件的测试
	changeName () {
		this.setState({name: '小龙女'})

		// 调用mixin的方法
		mixinLog.log()
	}

	// 事件参数传递测试,第二个参数
	receiveProp (value) {
		console.log(value)
	}

	// ref的威力
	refTest () {
		// 原生js改变样式
		var nat = document.getElementById('who')
		ReactDom.findDOMNode(nat).style.color = 'red'

		// ref的使用
		this.refs.who.style.color = 'green'

		// ref获取子组件dom
		// 这样获取到的是子组件的实例
		// var domTemp = this.refs.childRef
		// 通过配合findDomNode和refs就能拿到子组件的dom了
		var domTemp = ReactDom.findDOMNode(this.refs.childRef)
		console.log(domTemp)
	}

	// 这个是给子组件调用的事件，这样就实现了子组件修改父组件的变量,实现了双向绑定
	handlerChangeAge (event) {
		this.setState({age: event.target.value})
	}

	render () {
		var userName = '张三丰&nbsp;后裔'

		return (
				<div>
					{/*jsx的注释写法，下面这个danger是为了将userName的&nbsp转换成空格，这个要防止代码注入的问题。也可以通过将空格转换成unicode来进行显示*/}
					这是<p dangerouslySetInnerHTML = {{__html:userName}}></p>
					<p>{this.state.name}</p>
					<p>我是来自父组件的: {this.props.userId}</p>
					<p>我是来自父组件：country: {this.props.country}</p>
					<p>我{this.state.age}岁</p>
					{/*注意，这里必须bind(this)绑定this,或者直接在constructor里面绑定，这是一种更好的办法，如上*/}
					<input type="button" value="提交" onClick={this.changeName.bind(this)}/>
					<input type="button" value="参数传递" onClick={this.receiveProp.bind(this,'降龙十八掌')}/>
					{/*通过...this.props来将父组件传过来的所有参数传递给子组件*/}
					<BodyChild ref='childRef' {...this.props} handlerChangeAge={this.handlerChangeAge.bind(this)}/>

					<p id="who">通过ref改变我比原生的js改变我要好</p>
					<p ref='who'>ref使用</p>
					<button onClick={this.refTest.bind(this)}>点击测试ref</button>
				</div>
			)
	}
}

// react在15.5.0版本以后就见propType移除，被独立成一个新的包prop-type,记得安装prop-types,并在组件中import进来
ComponentBody.propTypes  = {
	userId: PropTypes.number.isRequired
}

ReactMixin(ComponentBody.prototype, mixinLog)