import React from 'react'

export default function LandingPage() {
  return (
    <div className='container'>
      <div>
        {' '}
        <h1>Landing Page</h1>
      </div>
      <hr />
      <a
        href='/login'
        className='btn btn-primary btn-lg active btn-block'
        role='button'
        aria-pressed='true'>
        Login
      </a>

      <br />
      <br />
      <a
        href='/register'
        className='btn btn-primary btn-lg active btn-block'
        role='button'
        aria-pressed='true'>
        Register
      </a>
    </div>
  )
}
