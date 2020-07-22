import React from 'react'

export default function footerComponent() {
  const year = new Date().getFullYear()
  return (
    <footer className='footer'>
      <p>Copyright (Not really) ⓒ {year} | Yash Karnik</p>
    </footer>
  )
}
