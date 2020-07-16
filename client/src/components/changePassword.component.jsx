import React, { Component } from 'react'
import { ReactComponent as Logo } from '../assets/confirm.svg'
import Axios from 'axios'
import Alert from './alert.component'
export default class changeUsernameComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      password1: '',
      password2: '',
      changeSuccess: false,
      emptyFieldsFlag: false,
      mismatchPasswords: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetAlertFlagFunction = this.resetAlertFlagFunction.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState((p) => {
      return { ...p, [name]: value }
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (
      this.state.password.length === 0 ||
      this.state.password1.length === 0 ||
      this.state.password2.length === 0
    ) {
      this.setState({ emptyFieldsFlag: true })
      return null
    } else if (this.state.password1 !== this.state.password2) {
      this.setState({ mismatchPasswords: true })
      return null
    } else {
      Axios.post(
        '/user/update-password',
        { password: this.state.password1 },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      )
        .then(() => {
          this.setState({ changeSuccess: true })
          setInterval(
            () =>
              (window.location =
                '/' + localStorage.getItem('username') + '/settings'),
            1000
          )
        })
        .catch(() => this.setState({ invalidUsername: true }))
    }
  }
  resetAlertFlagFunction(x, y) {
    this.setState({ [y]: !x })
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          <br />
          {this.state.changeSuccess ? (
            <Alert type='success' message='Password changed' />
          ) : null}
          {this.state.emptyFieldsFlag ? (
            <Alert
              type='danger'
              message='Empty fields disallowed'
              clickedProp={this.resetAlertFlagFunction}
              flag='emptyFieldsFlag'
            />
          ) : null}
          {this.state.mismatchPasswords ? (
            <Alert
              type='danger'
              message='Passwords do not match'
              clickedProp={this.resetAlertFlagFunction}
              flag='mismatchPasswords'
            />
          ) : null}
          <input
            className='form-control'
            placeholder='Current password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <input
            className='form-control'
            placeholder='New password'
            name='password1'
            type='password'
            value={this.state.password1}
            onChange={this.handleChange}
          />
          <br />
          <input
            className='form-control'
            placeholder='Reenter new password'
            name='password2'
            type='password'
            value={this.state.password2}
            onChange={this.handleChange}
          />
          <br />

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
