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
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.comment.length === 0) {
      console.log('¯\\_(ツ)_/¯')
    } else {
      Axios.post('/feedback/add', { comment: this.state.comment }).then(() => {
        this.setState({ submitSuccessFlag: true })
        this.setState({ comment: '' })
      })
    }
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
          <button
            className='btn btn-danger btn-lg btn-block'
            type='submit'
            style={{ width: '25%', margin: '0px auto 0px auto' }}>
            <Logo
              className='navbar-brand'
              style={{
                height: '2rem',
                width: '2rem',
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
