import React, { Component, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../assets/book.svg'
import { ReactComponent as Logo1 } from '../assets/logout.svg'
// #553739
export default function NavbarComponent(props) {
  const [HREF, setHREF] = useState('')
  useEffect(() => {
    console.log(window.location.href)
    setHREF(window.location.href)
  }, [])

  const checkHref = (url) => HREF.indexOf(url) >= 0

  return (
    <div className='pos-f-t'>
      <nav className='navbar navbar-dark bg-dark sticky-top navbar-expand-lg navbar-inverse'>
        <div className='collpase navbar-collapse'>
          <ul className='navbar-nav'>
            <Logo
              className='navbar-brand'
              style={{
                height: '2.7rem',
                width: '2rem',
                padding: '0px',
                margin: '0px 15px 0px 0px',
              }}
            />

            <li className='navbar-item'>
              <Link
                style={{ color: checkHref('myBlogs') && '#43d8c9' }}
                to={`/${localStorage.getItem('username')}/myBlogs`}
                className='navbar-brand'>
                Hi, @{localStorage.getItem('name')}
              </Link>
            </li>
            <li className='navbar-item'>
              <Link
                style={{ color: checkHref('create') && '#43d8c9' }}
                to={'/' + localStorage.getItem('username') + '/create'}
                className='nav-link'>
                Create new post
              </Link>
            </li>
            <li className='navbar-item'>
              <Link
                style={{ color: checkHref('allusers') && '#43d8c9' }}
                to={'/' + localStorage.getItem('username') + '/allusers'}
                className='nav-link'>
                Show all users
              </Link>
            </li>
            <li className='navbar-item'>
              <Link
                style={{ color: checkHref('settings') && '#43d8c9' }}
                to={'/' + localStorage.getItem('username') + '/settings'}
                className='nav-link'>
                Account Settings
              </Link>
            </li>
          </ul>
          <ul
            className='navbar-item'
            style={{
              margin: '0px 0px 0px auto',
              padding: '0px',
            }}>
            <li>
              <Link to={'/' + localStorage.getItem('username') + '/logout'}>
                <Logo1
                  style={{
                    fill: checkHref('logout') ? '#ff0000' : '#ffffff',
                  }}
                  className='logout-btn'
                />
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  )
}
