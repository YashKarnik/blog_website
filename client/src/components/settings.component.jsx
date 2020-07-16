import React, { Component } from 'react'
import Navbar from './navbar.component'
import ChangeUsername from './changeUsername.component'
import ChangePassword from './changePassword.component'
import { ReactComponent as Logo } from '../assets/user.svg'

export default class settingsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changeUsernameFlag: false,
      changePasswordFlag: false,
    }
  }
  render() {
    return (
      <div>
        <Navbar username={localStorage.getItem('username')} />
        <div className='container user'>
          <Logo
            className='navbar-brand'
            style={{
              height: '10rem',
              width: '10rem',
              padding: '0px',
              margin: '20px 0px 20px 0px',
            }}
          />
        </div>
        <div className='container-fluid'>
          <div className='row'>
            <div className='col-sm' style={{ textAlign: 'center' }}>
              <h2>{localStorage.getItem('username')}</h2>
            </div>
          </div>
          <div className='row'>
            <div className='col-sm'>
              <button
                className='btn btn-primary btn-lg btn-block'
                onClick={() =>
                  this.setState((p) => {
                    return { changeUsernameFlag: !p.changeUsernameFlag }
                  })
                }>
                Change Username
              </button>
              {this.state.changeUsernameFlag ? <ChangeUsername /> : null}
            </div>
            <div className='col-sm'>
              <button
                className='btn btn-primary btn-lg btn-block'
                onClick={() =>
                  this.setState((p) => {
                    return { changePasswordFlag: !p.changePasswordFlag }
                  })
                }>
                Change Password
              </button>
              {this.state.changePasswordFlag ? <ChangePassword /> : null}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
