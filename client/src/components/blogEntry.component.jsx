import React, { useState } from 'react'
import { ReactComponent as Logo } from '../assets/trash.svg'
import { ReactComponent as Logo1 } from '../assets/edit.svg'
import { ReactComponent as Logo2 } from '../assets/link.svg'
import { ReactComponent as Logo3 } from '../assets/expand.svg'
import { Link } from 'react-router-dom'
function BlogEntry(props) {
  const [readMoreFlag, setReadMoreFlag] = useState(false)

  ///////////////////
  function displayContent(content) {
    if (content.length < 100) {
      return <p style={{ margin: '0px 0px 0px 10px' }}>{content}</p>
    } else {
      return (
        <div style={{ margin: '0px 0px 0px 10px' }}>
          <p style={{ display: 'inline' }}>{content.substring(0, 100)}</p>

          {readMoreFlag ? (
            <p style={{ display: 'inline' }}>
              {content.substring(100, content.length)}
            </p>
          ) : (
            <Link
              to='#'
              onClick={() => {
                setReadMoreFlag({ readMoreFlag: true })
                console.log({ readMoreFlag: !readMoreFlag })
              }}>
              ....read more
            </Link>
          )}
        </div>
      )
    }
  }

  //////////////////////

  return (
    <div>
      <h3 style={{ margin: '0px 0px 0px 10px' }}>{props.element.title}</h3>
      {console.log(props.element)}
      {displayContent(props.element.content)}
      <em style={{ margin: '0px 0px 0px 10px' }}>
        Created on: {props.element.createdAt.substring(0, 10)}
      </em>
      <br />
      <br />
      <Link
        to='#'
        onClick={() => {
          props.deleteBlogProp(props.element._id)
        }}>
        <Logo className=' Edit-n-Delete' />
      </Link>
      {'|'}
      <Link
        to={`/edit/${props.element._id}/${localStorage.getItem(
          'username'
        )}/title=${props.element.title}&content=${props.element.content}`}>
        <Logo1 className=' Edit-n-Delete' />
      </Link>
      <span>{'|'}</span>
      {!readMoreFlag && props.element.content.length > 100 && (
        <Link
          to='#'
          onClick={() => {
            setReadMoreFlag({ readMoreFlag: true })
            console.log({ readMoreFlag: !readMoreFlag })
          }}>
          <Logo3 className=' Edit-n-Delete' />
        </Link>
      )}
      {!readMoreFlag && props.element.content.length > 100 && (
        <span>{'|'}</span>
      )}
      <Link to={`myBlogs/${props.element._id}`}>
        {' '}
        <Logo2 className=' Edit-n-Delete' />
      </Link>{' '}
      <span>{'|'}</span>
      <Link to={`myBlogs/${props.element._id}`}>
        <font size='4' style={{ marginLeft: '10px' }}>
          {props.element.likes} {props.element.likes === 1 ? 'like' : 'likes'}
          <span> & </span>
          {props.element.comments.length}{' '}
          {props.element.comments.length === 1 ? 'comment' : 'comments'} <hr />
        </font>
      </Link>
    </div>
  )
}

export default BlogEntry
