import React from 'react'

export default function footerComponent() {
  const year = new Date().getFullYear()
  return (
    <footer>
      <p>Copyright ⓒ {year}</p>
    </footer>
  )
}
