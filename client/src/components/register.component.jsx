import React, { Component } from 'react'
import Alert from './alert.component'
import Axios from 'axios'
import { ReactComponent as Logo } from '../assets/eye.svg'
import { ReactComponent as Logo1 } from '../assets/hidden.svg'
import generatePassword from 'password-generator'
import { Spring, config } from 'react-spring/renderprops'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      username: '',
      email: '',
      password: '',
      emptyFieldsFlag: false,
      invalidFieldsFlag: false,
      containsAmersand: false,
      showPasswordFlag: false,
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
    } else if (this.state.username.indexOf('@') !== -1) {
      this.setState({ containsAmersand: true })
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
      <Spring
        from={{ opacity: '0' }}
        to={{ opacity: '1' }}
        config={config.stiff}>
        {(props) => (
          <div style={props}>
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
              {this.state.containsAmersand ? (
                <Alert
                  message='Username connot contain `@` '
                  type='warning'
                  clickedProp={this.resetAlertFlagFunction}
                  flag='containsAmersand'
                />
              ) : null}
              <form onSubmit={this.handleSubmit} autoComplete='off'>
                <div class='input-group mb-3'>
                  <div class='input-group-prepend'>
                    <span class='input-group-text' id='basic-addon1'>
                      @
                    </span>
                  </div>
                  <input
                    className='form-control'
                    placeholder='Username'
                    name='username'
                    type='text'
                    value={this.state.username}
                    onChange={this.handleChange}
                  />
                </div>
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
                <div className='input-group mb-3'>
                  <input
                    className='form-control'
                    placeholder='Password'
                    name='password'
                    type={this.state.showPasswordFlag ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange}
                  />
                  <div className='input-group-append'>
                    <button
                      className=' btn btn-secondary postcommentBtn'
                      type='button'
                      onClick={() =>
                        this.setState((p) => {
                          return { ...p, showPasswordFlag: !p.showPasswordFlag }
                        })
                      }>
                      {this.state.showPasswordFlag ? (
                        <Logo
                          style={{
                            height: '1.3rem',
                            width: '1.3rem',
                            padding: '0px',
                            margin: '0px 7px 0px 5px',
                            fill: 'white',
                          }}
                        />
                      ) : (
                        <Logo1
                          style={{
                            height: '1.3rem',
                            width: '1.3rem',
                            padding: '0px',
                            margin: '0px 7px 0px 5px',
                            fill: 'white',
                          }}
                        />
                      )}
                    </button>
                    <button
                      className='btn input-group-text'
                      type='button'
                      onClick={() =>
                        this.setState({ password: generatePassword() })
                      }>
                      Suggest Strong password
                    </button>
                  </div>
                </div>
                <br />
                <button
                  className='btn btn-primary btn-lg btn-block'
                  type='Submit'>
                  Sign up
                </button>
                <br />
              </form>
            </div>
          </div>
        )}
      </Spring>
    )
  }
}
