import React, { Component } from 'react'
import Mouse from './index'

class Cat extends React.Component {
  render() {
    const mouse = this.props.mouse;
    return (
      <div style={{ height:'100px', background: 'red' }} >为中华之崛起而奋斗({mouse.x}-{mouse.y})</div>
    );
  }
}

class MouseTracker extends React.Component {
  render() {
    return (
      <div>
        <h1>移动鼠标!</h1>
        <Mouse render={mouse => (
          <Cat mouse={mouse} />
        )}/>
      </div>
    );
  }
}

export default MouseTracker