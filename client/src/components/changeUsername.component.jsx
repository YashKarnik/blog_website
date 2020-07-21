import React, { Component } from 'react'
import { ReactComponent as Logo } from '../assets/confirm.svg'
import Axios from 'axios'
import Alert from './alert.component'
export default class changeUsernameComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      invalidUsername: false,
      changeSuccess: false,
      emptyFieldsFlag: false,
      containsAmpersand: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetAlertFlagFunction = this.resetAlertFlagFunction.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  resetAlertFlagFunction(x, y) {
    this.setState({ [y]: !x })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.username.length === 0) {
      this.setState({ emptyFieldsFlag: true })
      return null
    } else if (this.state.username.indexOf('@') !== -1) {
      this.setState({ containsAmpersand: true })
    } else {
      Axios.post(
        '/user/update-username',
        { username: this.state.username },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      )
        .then((res) => {
          console.log(res.data.msg)
          if (res.data.msg === 'ExistingUser')
            this.setState({ invalidUsername: true })
          else {
            this.setState({ changeSuccess: true })
            localStorage.setItem('name', this.state.username)
            setInterval(
              () =>
                (window.location =
                  '/' + localStorage.getItem('name') + '/myBlogs'),
              1000
            )
          }
        })
        .catch((err) => {
          console.log(err)
          this.setState({ invalidUsername: true })
        })
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          <br />
          {this.state.changeSuccess ? (
            <Alert
              type='success'
              message='Username changed'
              clickedProp={this.resetAlertFlagFunction}
            />
          ) : null}
          {this.state.containsAmpersand ? (
            <Alert
              type='warning'
              message='Username cannot contain `@`'
              clickedProp={this.resetAlertFlagFunction}
              flag='containsAmpersand'
            />
          ) : null}
          {this.state.invalidUsername ? (
            <Alert
              type='danger'
              message='Username already exits.'
              clickedProp={this.resetAlertFlagFunction}
              flag='invalidUsername'
            />
          ) : null}
          {this.state.emptyFieldsFlag ? (
            <Alert
              type='danger'
              message='Empty fields disallowed'
              clickedProp={this.resetAlertFlagFunction}
              flag='emptyFieldsFlag'
            />
          ) : null}
          <input
            className='form-control'
            placeholder='New username'
            name='username'
            type='username'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <hr />
          <button className='btn btn-success btn-lg btn-block' type='submit'>
            <Logo
              className='navbar-brand'
              style={{
                height: '2rem',
                width: '2rem',
                padding: '0px',
                fill: 'white',
                margin: '0px 15px 0px 0px',
              }}
            />
            Confirm
          </button>
        </form>
        <br />
      </div>
    )
  }
}
