import React from 'react'
import footerCss from '../css/footer.css'

export default class BodyChild extends React.Component {
	constructor (props) {
		super(props)
		this.state = {
			test: false
		}
		this.changeTest = this.changeTest.bind(this)
		this.onChange = this.onChange.bind(this)
	}
	changeTest () {
		this.setState({
			test: !this.state.test
		})
	}
    onChange (date, dateString) {
 		 console.log(date, dateString);
	}
	render () {
		var style = {
			backgroundColor: 'red',//可以通过这种驼峰的写法
			//'padding-tip': '15px'//也可以通过这种原本css的写法，要加上引号，这样写控制台会报错警告，但不是错误，不推荐这种用法
		}
		var style2 = {
			header: {
				backgroundColor: 'green'
			},
			footer: {
				fontSize: '15px',
				height: (this.state.test) ? '20px':'50px' //样式表达式，注意这里不是花括号而是圆括号
			}
		}
		return (
			<div>
				我是body的儿子<input type="text" onChange={this.props.handlerChangeAge}/>
				<p style={style}>我是父组件通过...props获取过来的数据{this.props.userId} {this.props.country} {this.props.sex}</p>
				<p style={style2.header}>这是样式测试</p>
				<p style={style2.footer}>这是样式表达式的测试</p>
				<input type="button" value="提交" onClick={this.changeTest}/>
				{/*这里我安装了babel-plugin-react-html-attrs插件所以直接可以使用class这个来添加样式，如果没有这个插件那么需要将class改成className*/}
				{/*通过es6的字符串模板拼接两个class*/}
				<p class={`${footerCss.minFooter} ${footerCss.all}`}>这个样式是来自外部文件</p>
			</div>
		)
	}
}