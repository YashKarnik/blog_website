import React, { Component } from 'react'
import Navbar from './navbar.component'
export default class blogPageComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.match.params.title,
      content: this.props.match.params.content,
    }
  }

  render() {
    return (
      <div>
        <Navbar username={localStorage.getItem('username')} />
        <br />
        <br />
        <h1>
          <strong>{this.state.title}</strong>
        </h1>
        <hr />
        <h4>{this.state.content}</h4>
      </div>
    )
  }
}
