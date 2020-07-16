import React, { Component } from 'react'
import Navbar from './navbar.component'
import { ReactComponent as Logo } from '../assets/user.svg'

export default class settingsComponent extends Component {
  render() {
    return (
      <div>
        <Navbar username={this.props.match.params.username} />
        <form>
          <button
            className='form-control btn btn-primary btn-lg btn-block'
            placeholder='Title'
            name='title'
            type='button'>
            Settings
          </button>
        </form>
      </div>
    )
  }
}
