import React, { Component } from 'react'
import Navbar from './navbar.component'
import Alert from './alert.component'
import { ReactComponent as Logo } from '../assets/logout.svg'
import Axios from 'axios'
export default class logoutComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comment: '',
      submitSuccessFlag: false,
      emptyCommentFlag: false,
    }
    this.handleLogout = this.handleLogout.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetAlertFlagFunction = this.resetAlertFlagFunction.bind(this)
  }
  handleLogout(e) {
    e.preventDefault()
    localStorage.clear('token')
    localStorage.clear('username')
    window.location = '/'
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleSubmit() {
    if (this.state.comment.length !== 0) {
      Axios.post('/feedback/add', { comment: this.state.comment }).then(() =>
        this.setState({ submitSuccessFlag: true })
      )
    } else this.resetAlertFlagFunction(true, 'submitSuccessFlag')
  }
  resetAlertFlagFunction(x, y) {
    this.setState({ [y]: !x })
  }

  render() {
    return (
      <div>
        <Navbar username={this.props.match.params.username} />
        <hr />
        {this.state.submitSuccessFlag ? (
          <Alert
            message='Thanks!'
            type='success'
            clickedProp={this.resetAlertFlagFunction}
            flag='submitSuccessFlag'
          />
        ) : null}
        <form onSubmit={this.handleSubmit}>
          <h3>
            Let me know what you think about this website.Your submission will
            remain anonymous.
          </h3>
          <textarea
            className='form-control'
            placeholder='*Optional'
            name='comment'
            type='text'
            cols='30'
            rows='5'
            value={this.state.comment}
            onChange={this.handleChange}
          />
          <br />
          <button className='btn btn-success btn-lg btn-block' type='submit'>
            Submit
          </button>
        </form>
        <br />
        <br />
        <hr />
        <form onSubmit={this.handleLogout}>
          <button className='btn btn-primary btn-lg btn-block' type='submit'>
            <Logo
              className='navbar-brand'
              style={{
                height: '3rem',
                width: '2.7rem',
                padding: '0px',
                margin: '0px 0px 0px 0px',
              }}
            />
            {'                         '}
            Logout
          </button>
        </form>
      </div>
    )
  }
}
