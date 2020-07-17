import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as Logo } from '../assets/book.svg'
import { ReactComponent as Logo1 } from '../assets/logout.svg'

export default function navbarComponent(props) {
  return (
    <nav className='navbar navbar-dark bg-dark navbar-expand-lg navbar-inverse'>
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
            <Link to={`/${props.username}/myBlogs`} className='navbar-brand'>
              Hi, @{props.username || localStorage.getItem('username')}
            </Link>
          </li>
          <li className='navbar-item'>
            <Link
              to={'/' + localStorage.getItem('username') + '/create'}
              className='nav-link'>
              Create new post
            </Link>
          </li>
          <li className='navbar-item'>
            <Link
              to={'/' + localStorage.getItem('username') + '/settings'}
              className='nav-link'>
              Account Settings
            </Link>
          </li>
        </ul>
        <ul className='navbar-right' style={{ margin: '0pc 0px 0px auto' }}>
          <li>
            <Link to={'/' + localStorage.getItem('username') + '/logout'}>
              <Logo1 className='logout-btn' />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
