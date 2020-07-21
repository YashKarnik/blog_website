import React, { Component } from 'react'
import Axios from 'axios'
import { Link } from 'react-router-dom'

import Navbar from './navbar.component'
export default class userListComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      obtainedData: [],
    }
  }

  componentDidMount() {
    Axios.get('/user', {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    }).then((res) => {
      this.setState({ obtainedData: res.data })
      // console.log(this.state.obtainedData)
    })
  }
  render() {
    return (
      <div>
        <Navbar username={localStorage.getItem('name')} />
        <br />
        <div class='alert alert-info' role='alert'>
          <b>
            Only public profiles are visible in this list.To change your
            Visibility settings go to Account Settings{'>'}Visibility
          </b>
        </div>
        {this.state.obtainedData.map((element, index) => {
          if (
            element.visibility === true &&
            element._id !== localStorage.getItem('username')
          ) {
            return (
              <div key={index}>
                <Link to={`allusers/${element._id}`}>
                  <h2>@{element.username}</h2>
                  <hr />
                </Link>
              </div>
            )
          } else return null
        })}
      </div>
    )
  }
}
