import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Navbar from './navbar.component'
import { Link } from 'react-router-dom'
export default function OtherUserComponent(props) {
  const [userData, setUserData] = useState({})
  const [blogData, setBlogData] = useState({})
  const [readMore, setReadMore] = useState({ id: '', flag: false })
  useEffect(() => {
    Axios.get(`/user/${props.match.params.OtherUserId}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    }).then((res) => setUserData(res.data[0]))
    Axios.get(`/blog/all-blogs/${props.match.params.OtherUserId}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    }).then((res) => setBlogData(res.data))
  }, [])

  return (
    <div>
      <Navbar />
      <br />
      {userData.username && (
        <div>
          <h2>@{userData.username}</h2>
          <i>Joined on: {userData.createdAt.substring(0, 10)}</i>
        </div>
      )}
      <hr className='specialHR' />
      {blogData[0] &&
        blogData.map((e, i) => {
          return (
            <div key={i}>
              <Link to={`${props.match.params.OtherUserId}/${e._id}`}>
                <h3>{e.title}</h3>
              </Link>
              <h4>
                {e.content.substring(0, 100)}
                <Link to={`${props.match.params.OtherUserId}/${e._id}`}>
                  ...read more
                </Link>
              </h4>
              <p>
                Likes:{e.likes} | Comments {e.comments.length}
              </p>
              <hr />
            </div>
          )
        })}
    </div>
  )
}
