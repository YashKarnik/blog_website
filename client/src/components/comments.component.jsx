import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Alert from './alert.component'
import { ReactComponent as Logo1 } from '../assets/trash.svg'
import { ReactComponent as Logo } from '../assets/add.svg'

const CommentEntry = (props) => {
  return (
    <div>
      <p>
        <font size='4'>
          {props.username ? (
            <b>
              @{props.username}
              <span>&middot;</span>
            </b>
          ) : (
            <p>@ [deleted]</p>
          )}
        </font>
        <i style={{ marginRight: '900px' }}>
          {localStorage.getItem('name') === props.username && '(You) '}
          {localStorage.getItem('name') === props.username && <b>&middot;</b>}

          {props.createdAt.substring(0, 10)}
        </i>
        {props.username === localStorage.getItem('name') && (
          <Link
            to='#'
            onClick={() =>
              props.deleteCommentProp(props.BlogID, props.CommentID)
            }>
            <Logo1 className='remove-comment-btn' />
          </Link>
        )}
      </p>
      <h5>{props.content}</h5>
      <hr />
    </div>
  )
}

export default function CommentsComponent(props) {
  // const [comments, setcomments] = useState()
  // const [renderNewCommentFlag, setRenderNewCommentFlag] = useState(false)
  const [commentTxt, setCommentTxt] = useState('')
  const [successFlag, setSuccessFlag] = useState({
    success: false,
    empty: false,
  })

  function handleChange(e) {
    const { value } = e.target
    setCommentTxt(value)
  }
  function resetAlertFlagFunction(x, y) {
    setSuccessFlag((p) => {
      return { ...p, [y]: !x }
    })
  }
  function handleSubmit(e) {
    e.preventDefault()
    if (commentTxt.length !== 0) {
      Axios.post(
        `/blog/post-comment/${props.blogId}`,
        { content: commentTxt, PosterUsername: localStorage.getItem('name') },
        { headers: { 'x-auth-token': localStorage.getItem('token') } }
      ).then((res) => {
        setSuccessFlag((p) => {
          return { ...p, success: true }
        })
        setCommentTxt('')
        window.location.reload()
      })
    } else
      setSuccessFlag((p) => {
        return { ...p, empty: true }
      })
  }

  return (
    <div>
      {successFlag.success && (
        <Alert
          message='Comment added'
          type='success'
          clickedProp={resetAlertFlagFunction}
          flag='success'
        />
      )}
      {successFlag.empty && (
        <Alert
          message='Empty comment!'
          type='danger'
          clickedProp={resetAlertFlagFunction}
          flag='empty'
        />
      )}

      <form autoComplete='off' onSubmit={handleSubmit}>
        <div className='input-group mb-3'>
          <input
            type='text'
            className='form-control'
            placeholder='Post comment'
            aria-label="Recipient's username"
            aria-describedby='basic-addon2'
            value={commentTxt}
            onChange={handleChange}
          />
          <div className='input-group-append'>
            <span>
              <button
                type='submit'
                className='btn btn-dark btn-sm postcommentBtn'
                style={{ textAlign: 'center' }}>
                <Logo style={{ height: '27.764px', width: '1.7rem' }} />
              </button>
            </span>
          </div>
        </div>
      </form>

      {props.comments.length === 0 && (
        <div className='alert alert-secondary '>No comments yet :( </div>
      )}
      {/* {props.comments || props.comments.length === 0 ? ( */}
      {props.comments.map((e, i) => {
        return (
          <CommentEntry
            key={i}
            content={e.content}
            username={e.PosterUsername}
            createdAt={e.createdAt}
            CommentID={e._id}
            BlogID={e.BlogID}
            deleteCommentProp={props.deleteCommentProp}
          />
        )
      })}
    </div>
  )
}
