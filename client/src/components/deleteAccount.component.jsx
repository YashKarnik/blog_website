import React, { Component } from 'react'
import { ReactComponent as Logo } from '../assets/skull.svg'
import Axios from 'axios'
import Alert from './alert.component'

export default class deleteAccountComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: 'false',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.resetAlertFlagFunction = this.resetAlertFlagFunction.bind(this)
  }
  resetAlertFlagFunction(x, y) {
    this.setState({ [y]: !x })
  }
  handleSubmit(e) {
    e.preventDefault()
    Axios.delete('/user/delete', {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    })
      .then((res) => {
        this.setState({ success: true })
        window.location = '/logout'
        localStorage.clear('username')
        localStorage.clear('token')
      })
      .catch((err) => console.log(err))
  }
  render() {
    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit}>
          {this.state.success ? (
            <Alert
              type='success'
              message='Account deleted.You may now log out'
              clickedProp={this.resetAlertFlagFunction}
            />
          ) : null}
          <button className='btn btn-dark btn-lg btn-block' type='submit'>
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
            Confirm ?
          </button>
        </form>
      </div>
    )
  }
}
