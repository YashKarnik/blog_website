import React, { Component } from 'react'
import Navbar from './navbar.component'
import ChangeUsername from './changeUsername.component'
import ChangePassword from './changePassword.component'
import ChangeEmail from './changeEmail.component'
import DeleteAccount from './deleteAccount.component'
import { ReactComponent as Logo } from '../assets/user.svg'
import { ReactComponent as Logo0 } from '../assets/user (1).svg'
import { ReactComponent as Logo1 } from '../assets/email.svg'
import { ReactComponent as Logo2 } from '../assets/key.svg'
import { ReactComponent as Logo3 } from '../assets/warning.svg'

export default class settingsComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      changeUsernameFlag: false,
      changePasswordFlag: false,
      changeEmailFlag: false,
      deleteAccount: false,
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
                <Logo0
                  className='navbar-brand'
                  style={{
                    height: '1.6rem',
                    width: '1.6rem',
                    padding: '0px',
                    margin: '0px 7px 0px 5px',
                    fill: 'white',
                  }}
                />
                Change Username
              </button>
              {this.state.changeUsernameFlag && <ChangeUsername />}
            </div>
            <div className='col-sm'>
              <button
                className='btn btn-primary btn-lg btn-block'
                onClick={() =>
                  this.setState((p) => {
                    return { changePasswordFlag: !p.changePasswordFlag }
                  })
                }>
                <Logo2
                  className='navbar-brand'
                  style={{
                    height: '1.6rem',
                    width: '1.6rem',
                    padding: '0px',
                    margin: '0px 7px 0px 5px',
                    fill: 'white',
                  }}
                />
                Change Password
              </button>
              {this.state.changePasswordFlag && <ChangePassword />}
            </div>
          </div>
          <br />
          <div className='row'>
            <div className='col-sm'>
              <button
                className='btn btn-primary btn-lg btn-block'
                onClick={() =>
                  this.setState((p) => {
                    return { changeEmailFlag: !p.changeEmailFlag }
                  })
                }>
                <Logo1
                  className='navbar-brand'
                  style={{
                    height: '1.6rem',
                    width: '1.6rem',
                    padding: '0px',
                    margin: '0px 7px 0px 5px',
                    fill: 'white',
                  }}
                />
                Change Email
              </button>
              {this.state.changeEmailFlag && <ChangeEmail />}
            </div>
            <div className='col-sm'>
              <button
                className='btn btn-danger btn-lg btn-block'
                onClick={() =>
                  this.setState((p) => {
                    return { deleteAccount: !p.deleteAccount }
                  })
                }>
                <Logo3
                  className='navbar-brand'
                  style={{
                    height: '1.6rem',
                    width: '1.6rem',
                    padding: '0px',
                    margin: '0px 7px 0px 5px',
                  }}
                />
                Delete Account
              </button>
              {this.state.deleteAccount && <DeleteAccount />}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
