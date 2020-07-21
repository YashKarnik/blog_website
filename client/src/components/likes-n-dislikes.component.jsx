import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../assets/like.svg'
import Axios from 'axios'
export default class likesNdislikesComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: Number(this.props.points),
      liked: false,
      user: {},
    }
    this.handleLike = this.handleLike.bind(this)
  }
  componentDidMount() {
    // console.log('details', this.props)
    if (this.props.blogDetails.likedBy.indexOf(this.props.currentUserID) < 0) {
      this.setState({ liked: false })
    } else this.setState({ liked: true })
  }

  handleLike() {
    this.setState((p) => {
      return { ...p, liked: !p.liked }
    })
    if (this.state.liked === false)
      this.setState((p) => {
        return { ...p, count: p.count + 1 }
      })
    else
      this.setState((p) => {
        return { ...p, count: p.count - 1 }
      })
    Axios.post(
      `/blog/like/${this.props.blogId}/${!this.state.liked}/${
        this.props.currentUserID
      }`,
      {},
      { headers: { 'x-auth-token': localStorage.getItem('token') } }
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        <Link to='#' onClick={this.handleLike}>
          <Logo
            className='Edit-n-Delete'
            style={{
              margin: '0px 10px 10px 10px',
              fill: this.state.liked && 'blue',
            }}
          />
        </Link>

        {this.state.count}
      </div>
    )
  }
}
