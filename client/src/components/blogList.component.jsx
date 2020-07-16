import React, { Component } from 'react'
import Navbar from './navbar.component'
import Axios from 'axios'
import { ReactComponent as Logo } from '../assets/trash.svg'
import { ReactComponent as Logo1 } from '../assets/edit.svg'
import { Link } from 'react-router-dom'

const BlogEntry = (props) => {
  return (
    <div>
      <h3>{props.element.title}</h3>
      <p>{props.element.content}</p>
      <Link
        to='#'
        onClick={() => {
          props.deleteBlogProp(props.element._id)
        }}>
        <Logo
          className=' Edit-n-Delete'
          style={{
            height: '25px',
            width: '25px',
            padding: '0px',
            margin: '0px 10px 0px 0px',
          }}
        />
      </Link>
      {'|'}
      <Link
        to={`/edit/${props.element._id}/username/title=${props.element.title}&content=${props.element.content}`}>
        <Logo1
          className=' Edit-n-Delete'
          style={{
            height: '25px',
            width: '25px',
            padding: '0px',
            margin: '0px 0px 0px 10px',
          }}
        />
      </Link>
      <hr />
    </div>
  )
}

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
        <Navbar username={this.props.match.params.username} />
        <hr />
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
