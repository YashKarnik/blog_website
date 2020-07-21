import React, { Component } from 'react'
import Navbar from './navbar.component'
import LikesAndDislikes from './likes-n-dislikes.component'
import Comments from './comments.component'
import Axios from 'axios'
export default class blogPageComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      likes: null,
      comments: [],
      fullDetails: {},
    }
    this.deleteComment = this.deleteComment.bind(this)
  }

  componentDidMount() {
    console.log(this.props.match.params.id)
    Axios.get(`/blog/${this.props.match.params.id}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    })
      .then((res) => {
        this.setState({
          likes: res.data[0].likes,
          comments: res.data[0].comments,
          fullDetails: res.data[0],
        })
      })
      .catch((err) => console.log(err))
  }

  deleteComment(blogID, commentID) {
    console.log('yash', blogID, commentID)
    Axios.delete(`/blog/delete-comment/${blogID}/${commentID}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    }).then((res) => {
      this.setState({
        comments: this.state.comments.filter((el) => el._id !== commentID),
      })
    })
  }

  render() {
    return (
      <div>
        <Navbar username={localStorage.getItem('username')} />
        <br />
        <br />
        <h1>{this.state.fullDetails.title}</h1>
        <h3>{this.state.fullDetails.content}</h3>
        <i>
          Created on:{' '}
          {String(this.state.fullDetails.createdAt).substring(0, 10)}
        </i>
        <hr className='specialHR' />
        {this.state.likes !== null && (
          <LikesAndDislikes
            points={this.state.fullDetails.likes}
            blogId={this.props.match.params.id}
            blogDetails={this.state.fullDetails}
            currentUserID={localStorage.getItem('username')}
          />
        )}
        <br />
        <br />
        {this.state.comments !== null && (
          <Comments
            comments={this.state.comments}
            blogId={this.props.match.params.id}
            deleteCommentProp={this.deleteComment}
          />
        )}
      </div>
    )
  }
}
