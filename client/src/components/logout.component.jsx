import React, { Component } from 'react'
import Navbar from './navbar.component'
import { ReactComponent as Logo } from '../assets/logout.svg'
export default class logoutComponent extends Component {
  constructor(props) {
    super(props)
    this.handleLogout = this.handleLogout.bind(this)
  }
  handleLogout(e) {
    e.preventDefault()
    localStorage.clear('token')
    window.location = '/'
  }

  render() {
    return (
      <div>
        <Navbar username={this.props.match.params.username} />
        <hr />
        <form>
          <h3>
            Let me know what you think about this website.Your submission will
            remain anonymous
          </h3>
          <textarea
            className='form-control'
            placeholder='*Optional'
            name='content'
            type='text'
            cols='30'
            rows='5'
          />
        </form>
        <br />
        <br />
        <hr />
        <form onSubmit={this.handleLogout}>
          <button className='btn btn-primary btn-lg btn-block' type='submit'>
            <Logo
              className='navbar-brand'
              style={{
                height: '3rem',
                width: '2.7rem',
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
