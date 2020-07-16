import React, { Component } from 'react'
import Alert from './alert.component'
import Axios from 'axios'
export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      emptyFieldsFlag: false,
      invalidFieldsFlag: false,
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
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      console.log('empty fields!!')
      this.setState({ emptyFieldsFlag: true })
    } else {
      Axios.post('/user/add', { ...this.state })
        .then((res) => {
          this.setState({ username: '', email: '', password: '' })
          window.location = '/login'
        })
        .catch((err) => this.setState({ invalidFieldsFlag: true }))
    }
  }
  render() {
    return (
      <div className='container'>
        <h1>Register</h1>
        <hr />
        {this.state.emptyFieldsFlag ? (
          <Alert
            message='Empty Fields Disallowed!'
            type='danger'
            clickedProp={this.resetAlertFlagFunction}
            flag='emptyFieldsFlag'
          />
        ) : null}
        {this.state.invalidFieldsFlag ? (
          <Alert
            message='User Already exists.Please select different username/email'
            type='danger'
            clickedProp={this.resetAlertFlagFunction}
            flag='invalidFieldsFlag'
          />
        ) : null}
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          <input
            className='form-control'
            placeholder='Username'
            name='username'
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
          <input
            className='form-control'
            placeholder='Email'
            name='email'
            type='email'
            value={this.state.email}
            onChange={this.handleChange}
          />
          <br />
          <input
            className='form-control'
            placeholder='Password'
            name='password'
            type='password'
            value={this.state.password}
            onChange={this.handleChange}
          />
          <br />
          <input className='btn btn-primary btn-lg btn-block' type='Submit' />
          <br />
        </form>
      </div>
    )
  }
}
