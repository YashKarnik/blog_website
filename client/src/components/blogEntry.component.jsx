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
          <span>{content.substring(0, 100)}</span>

          {readMoreFlag ? (
            <span>{content.substring(100, content.length - 1)}</span>
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
      {displayContent(props.element.content)}
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
      <Link
        to={`myBlogs/title=${props.element.title}&content=${props.element.content}`}>
        {' '}
        <Logo2 className=' Edit-n-Delete' />
      </Link>{' '}
      <hr />
    </div>
  )
}

export default BlogEntry
