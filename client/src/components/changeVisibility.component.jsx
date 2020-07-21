import React, { useState, useEffect } from 'react'
import { ReactComponent as Logo } from '../assets/eye.svg'
import { ReactComponent as Logo1 } from '../assets/hidden.svg'
import Axios from 'axios'

export default function ChangeVisibilityComponent() {
  const [userDetails, setUserDetails] = useState({})
  // const [successFlag, setSuccessFlag] = useState(false)
  useEffect(() => {
    Axios.get(`/user/${localStorage.getItem('username')}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    })
      .then((res) => setUserDetails(res.data[0].visibility))
      .catch((err) => console.log(err))
  }, [])

  function handleClick() {
    Axios.post(
      '/user/change-visibility',
      { flag: !userDetails },
      { headers: { 'x-auth-token': localStorage.getItem('token') } }
    ).then((res) => {
      console.log(res.data.msg)
      // setSuccessFlag(true)
      setUserDetails(res.data.msg)
    })
  }
  // function resetAlertFlagFunction(x, y) {
  //   setSuccessFlag({ [y]: !x })
  // }

  return (
    <div>
      <br />
      <button
        className={`btn btn-${userDetails ? 'info' : 'dark'} btn-lg btn-block`}
        className={
          userDetails
            ? 'btn btn-info btn-lg btn-block'
            : 'btn btn-dark btn-lg btn-block'
        }
        onClick={handleClick}>
        {userDetails ? (
          <Logo
            style={{
              height: '1.6rem',
              width: '1.6rem',
              padding: '0px',
              margin: '0px 7px 0px 5px',
              fill: 'white',
            }}
          />
        ) : (
          <Logo1
            style={{
              height: '1.6rem',
              width: '1.6rem',
              padding: '0px',
              margin: '0px 7px 0px 5px',
              fill: 'white',
            }}
          />
        )}
        {userDetails ? 'Public' : 'Private'}
        .(Click to toggle)
      </button>
    </div>
  )
}
