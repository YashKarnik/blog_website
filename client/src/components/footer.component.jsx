import React from 'react'
import { ReactComponent as Logo } from '../assets/github.svg'
import { ReactComponent as Logo1 } from '../assets/linkedin.svg'
export default function footerComponent() {
  return (
    <div>
      <footer className='container'>
        <p style={{ padding: '0px 0px 0px 0px' }}>
          <a href='https://github.com/YashKarnik'>
            <Logo
              className='navbar-brand'
              style={{
                height: '3rem',
                width: '2.7rem',
                padding: '0px',
                margin: '0px 15px 0px 0px',
              }}
            />
          </a>
          <a href='https://www.linkedin.com/in/yash-karnik-2677a2183/'>
            <Logo1
              className='navbar-brand'
              style={{
                height: '3rem',
                width: '2.7rem',
                padding: '0px',
                margin: '0px 0px 0px 0px',
              }}
            />
          </a>
        </p>
      </footer>
    </div>
  )
}
