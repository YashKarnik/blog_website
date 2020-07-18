import React, { Component } from 'react'
import Navbar from './navbar.component'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import BlogEntry from './blogEntry.component'

export default class blogListComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      obtainedData: [],
    }
    this.deleteBlogPost = this.deleteBlogPost.bind(this)
  }

  componentDidMount() {
    Axios.get(`/blog/all-blogs`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    })
      .then((res) => this.setState({ obtainedData: res.data }))
      .catch((err) => console.log(err))
  }
  deleteBlogPost(id) {
    Axios.delete(`/blog/delete/${id}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    })
      .then((res) => {
        console.log(res, 'deleted')
        this.setState({
          obtainedData: this.state.obtainedData.filter((el) => el._id !== id),
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        {' '}
        <Navbar username={localStorage.getItem('username')} />
        <br />
        {this.state.obtainedData.length === 0 ? (
          <div className='alert alert-info'>
            No entries found.Click{' '}
            <Link to={`/${localStorage.getItem('username')}/create`}>here</Link>{' '}
            to create first post
          </div>
        ) : null}
        {this.state.obtainedData.map((element, index) => {
          return (
            <BlogEntry
              element={element}
              key={index}
              deleteBlogProp={this.deleteBlogPost}
            />
          )
        })}
      </div>
    )
  }
}
