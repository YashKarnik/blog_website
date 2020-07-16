import React, { Component } from 'react'
import Alert from './alert.component'
import Axios from 'axios'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      emptyFieldsFlag: false,
      incorrectFieldsFlag: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ emptyFieldsFlag: true })
    } else {
      const { email, password } = this.state
      Axios.post('/auth', { email, password })
        .then((res) => {
          localStorage.setItem('token', res.data.token)
          localStorage.setItem('username', res.data.user.username)
          console.log(res.data.user, localStorage.getItem('token'))
          this.setState({ email: '', password: '' })
          window.location = '/' + localStorage.getItem('username') + '/create'
        })
        .catch((err) => this.setState({ incorrectFieldsFlag: true }))
    }
  }
  render() {
    return (
      <div className='container'>
        <h1>Login</h1>
        {this.state.emptyFieldsFlag ? (
          <Alert message='Empty fields Disallowed!' type='danger' />
        ) : null}
        {this.state.incorrectFieldsFlag ? (
          <Alert message='Incorrect Credentials!' type='danger' />
        ) : null}
        <hr />
        <form onSubmit={this.handleSubmit} autoComplete='off'>
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
