import React, { Component } from 'react'
import Navbar from './navbar.component'
import Axios from 'axios'
import { ReactComponent as Logo } from '../assets/add.svg'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo1 } from '../assets/link.svg'
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
        // console.log(res, 'deleted')
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
        <Navbar username={localStorage.getItem('name')} />
        <br />
        {this.state.obtainedData.length === 0 ? (
          <div className='alert alert-info'>
            No entries found.Click{' '}
            <Link to={`/${localStorage.getItem('username')}/create`}>here</Link>{' '}
            to create first post
          </div>
        ) : (
          <div class='alert alert-secondary' role='alert'>
            <strong>
              {' '}
              Click on the
              <Logo1
                className=' Edit-n-Delete'
                style={{ height: '20px', width: '20px' }}
              />
              to like and post comments
            </strong>
          </div>
        )}
        {this.state.obtainedData.map((element, index) => {
          return (
            <BlogEntry
              element={element}
              key={index}
              deleteBlogProp={this.deleteBlogPost}
            />
          )
        })}
        <div style={{ textAlign: 'center' }}>
          {this.state.obtainedData.length !== 0 && (
            <Link to={`/${localStorage.getItem('username')}/create`}>
              <button
                className='btn btn-dark btn-sm'
                style={{ borderRadius: '100%', textAlign: 'center' }}>
                <Logo style={{ height: '2rem', width: '1.7rem' }} />
              </button>
            </Link>
          )}
        </div>
      </div>
    )
  }
}
