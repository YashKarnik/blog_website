import React from 'react'

export default function dangerAlertcomponent(props) {
  return (
    <div
      className={`alert alert-${props.type} alert-dismissible fade show`}
      role='alert'>
      <strong>{props.message}</strong>
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
        onClick={() => props.clickedProp(true, props.flag)}>
        <span aria-hidden='true'>&times;</span>
      </button>
    </div>
  )
}
