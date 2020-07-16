import React, { Component } from 'react'
import Navbar from './navbar.component'
import Axios from 'axios'

import Alert from './alert.component'
export default class createBlogComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: this.props.match.params.title,
      content: this.props.match.params.content,
      emptyFieldsFlag: false,
      successFlag: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  handleChange(e) {
    const { name, value } = e.target
    this.setState({ [name]: value })
  }

  handleSubmit(e) {
    e.preventDefault()
    if (this.state.title.length === 0 || this.state.content.length === 0) {
      this.setState({ emptyFieldsFlag: true })
    } else {
      const { title, content } = this.state
      Axios.patch(
        `/blog/update/${this.props.match.params.id}`,
        { title, content },
        {
          headers: { 'x-auth-token': localStorage.getItem('token') },
        }
      )
        .then((res) => {
          this.setState({ successFlag: true })
          this.setState({ title: '', content: '', emptyFieldsFlag: false })
          window.location = '/' + localStorage.getItem('username') + '/myBlogs'
        })
        .catch((err) => console.error(err))
    }

    // alert(this.state, this.props.match.params)
  }
  render() {
    return (
      <div>
        <Navbar username={this.props.match.username} />
        <form onSubmit={this.handleSubmit} autoComplete='off'>
          {this.state.emptyFieldsFlag ? (
            <div>
              <br />
              <Alert message='Empty Fields Disallowed' type='danger' />
            </div>
          ) : null}
          {this.state.successFlag ? (
            <div>
              <br />
              <Alert message='Successfully Updated' type='success' />
            </div>
          ) : null}
          <h4>Title</h4>
          <input
            className='form-control'
            placeholder='Title'
            name='title'
            type='text'
            value={this.state.title}
            onChange={this.handleChange}
          />
          <br />
          <h4>Content</h4>
          <textarea
            className='form-control'
            placeholder='Content'
            name='content'
            type='text'
            value={this.state.content}
            onChange={this.handleChange}
            cols='30'
            rows='10'
          />
          <hr />
          <button className='btn btn-primary btn-lg btn-block' type='submit'>
            Update
          </button>
        </form>
      </div>
    )
  }
}
