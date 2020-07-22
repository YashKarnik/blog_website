import React, { useState, useEffect } from 'react'
import Navbar from './navbar.component'
import Axios from 'axios'
import LikesAndDislikes from './likes-n-dislikes.component'
import Comments from './comments.component'
export default function OtherUserBlogPageFullComponent(props) {
  const [blogDetails, setBlogDetails] = useState(null)
  const [comments, setComments] = useState(null)
  const [username, setUsername] = useState('')
  useEffect(() => {
    Axios.get(`/blog/${props.match.params.OtherUserBlogID}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    }).then((res) => {
      setBlogDetails(res.data)
      console.log('commts2', res.data[0].userID)
      setComments(res.data[0].comments)

      Axios.get(`/user/${res.data[0].userID}`, {
        headers: { 'x-auth-token': localStorage.getItem('token') },
      }).then((res) => setUsername(res.data[0].username))
    })
  }, [])
  function deleteComment(blogID, commentID) {
    console.log('yash', blogID, commentID)
    Axios.delete(`/blog/delete-comment/${blogID}/${commentID}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    }).then((res) => {
      setComments(comments.filter((el) => el._id !== commentID))
    })
  }

  return (
    <div>
      <Navbar />
      <br />
      <h3>Posted By @{username}</h3>
      <hr />

      {blogDetails ? (
        blogDetails.map((e, i) => {
          return (
            <div key={i}>
              <h3>{e.title}</h3>
              <h4>{e.content}</h4>
              {blogDetails ? (
                <LikesAndDislikes
                  points={blogDetails[0].likes}
                  blogId={blogDetails[0]._id}
                  blogDetails={blogDetails[0]}
                  currentUserID={blogDetails[0].userID}
                />
              ) : (
                <h4>likes loadin.Please hold on...</h4>
              )}
              <hr className='specialHR' />
            </div>
          )
        })
      ) : (
        <h4>Loading.Please hold on...</h4>
      )}

      {comments ? (
        <i>{comments.length} comments</i>
      ) : (
        <h3>No comments found</h3>
      )}
      <br />
      <br />
      {comments && (
        <Comments
          comments={comments}
          blogId={props.match.params.OtherUserBlogID}
          deleteCommentProp={deleteComment}
        />
      )}
      {/* {comments ? (
        comments.map((e, i) => {
          return (
            <div key={i}>
              <h4>@{e.PosterUsername}</h4>
              <i>Posted on:{e.createdAt.substring(0, 10)}</i>
              <h5>{e.content}</h5>
              <hr />
            </div>
          )
        })
      ) : (
        <h4>Loading.Please hold on...</h4>
      )} */}
    </div>
  )
}
