import React, { useState } from 'react'
import Alert from './alert.component'
import Axios from 'axios'
export default function ForgotPasswordComponent() {
  const [Email, setEmail] = useState('')
  const [successFlag, setSuccessFlag] = useState(false)
  function resetAlertFlagFunction(x, y) {
    setSuccessFlag((p) => {
      return { ...p, [y]: !x }
    })
  }
  function handleSubmit(e) {
    e.preventDefault()
    setEmail('')
    Axios.post('/recovery/forgot-password', { email: Email })
      .then((res) => {
        console.log(res.data)
        setSuccessFlag(true)
      })
      .catch((e) => console.log(e))
  }
  return (
    <form autoComplete='off' onSubmit={handleSubmit}>
      <br />
      <div className='input-group mb-3'>
        <input
          className='form-control'
          placeholder='Enter regestered email here'
          name='Email'
          type='email'
          required
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          className='input-group-append btn btn-secondary postcommentBtn'
          type='submit'>
          Submit
        </button>
      </div>
      {successFlag && (
        <Alert
          message='Recovery password is send to registered mail'
          type='info'
          clickedProp={resetAlertFlagFunction}
          flag='successFlag'
        />
      )}
    </form>
  )
}
