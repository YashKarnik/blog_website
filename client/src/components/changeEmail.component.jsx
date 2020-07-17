import React, { Component } from 'react'
import { ReactComponent as Logo } from '../assets/confirm.svg'
import Axios from 'axios'
import Alert from './alert.component'
export default class changeEmailComponent extends Component {
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
    } else {
      Axios.post(
        '/user/update-email',
        { email: this.state.username },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      )
        .then((res) => {
          console.log(res.data.msg)
          if (res.data.msg === 'ExistingUser')
            this.setState({ invalidUsername: true })
          else {
            this.setState({ changeSuccess: true })
            setInterval(
              () =>
                (window.location =
                  '/' + localStorage.getItem('username') + '/myBlogs'),
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
              message='Email changed'
              clickedProp={this.resetAlertFlagFunction}
            />
          ) : null}

          {this.state.invalidUsername ? (
            <Alert
              type='danger'
              message='Email already exists.Please select a differrent one'
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
            placeholder='New email'
            name='username'
            type='email'
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
