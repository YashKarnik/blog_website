import React from 'react'
import Navbar from './navbar.component'
import { ReactComponent as Logo } from '../assets/github.svg'
import { ReactComponent as Logo1 } from '../assets/linkedin.svg'
import Logo2 from '../assets/flaticon.jpg'

export default function Credits() {
  return (
    <div>
      <Navbar />
      <br />
      <ul class='list-group'>
        <li class='list-group-item list-group-item-primary'>
          <strong>Author: Yash Karnik</strong>
        </li>

        <li class='list-group-item list-group-item-success'>
          <a href='https://github.com/YashKarnik/blog_website'>
            <Logo
              className='navbar-brand'
              style={{
                height: '1.6rem',
                width: '1.6rem',
                padding: '0px',
                margin: '0px 7px 8px 5px',
                fill: '#6cc644',
              }}
            />{' '}
            Github Repository from this website
          </a>
        </li>
        <li class='list-group-item list-group-item-primary'>
          <a href='https://www.flaticon.com/'>
            <img
              src={Logo2}
              alt='Logo'
              style={{
                height: '1.6rem',
                width: '1.6rem',
                padding: '0px',
                margin: '0px 7px 0px 5px',
              }}
            />{' '}
            All icons and vector graphics provided by <b>Flaticon&trade;</b>
            .Credits to the respective artists
          </a>
        </li>
        <li class='list-group-item list-group-item-success'>
          {' '}
          <a href='https://github.com/YashKarnik'>
            <Logo
              className='navbar-brand'
              style={{
                height: '1.6rem',
                width: '1.6rem',
                padding: '0px',
                margin: '0px 7px 8px 5px',
                fill: '#6cc644',
              }}
            />
            Github Account
          </a>
        </li>
        <li class='list-group-item list-group-item-primary'>
          {' '}
          <a href='https://www.linkedin.com/in/yash-karnik-2677a2183/'>
            <Logo1
              className='navbar-brand'
              style={{
                height: '1.6rem',
                width: '1.6rem',
                padding: '0px',
                margin: '0px 7px 13px 5px',
                fill: '#0072b1',
              }}
            />
            LinkedIn
          </a>
        </li>
      </ul>
    </div>
  )
}
