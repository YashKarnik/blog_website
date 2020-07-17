import React, { Component } from 'react'
import Navbar from './navbar.component'
import Axios from 'axios'

import { Link } from 'react-router-dom'
import BlogEntry from './blogEntry.component'
// const BlogEntry = (props) => {
//   const [readMoreFlag, setReadMoreFlag] = useState(false)
// ///////////////////
//   function displayContent(content) {
//     if (content.length < 100) {
//       return <p>{content}</p>
//     } else {
//       return (
//         <p>
//           {content.substring(0, 100)}
//           {!readMoreFlag && (
//             <Link onClick={() => setReadMoreFlag({ readMoreFlag: true })}>
//               ....read more
//             </Link>
//           )}
//           {readMoreFlag && <p>{content.substring(101, content.length - 1)}</p>}
//         </p>
//       )
//     }
//   }
// //////////////////////

//   return (
//     <div>
//       <h3>{props.element.title}</h3>
//       <p>{displayContent(props.element.content)}</p>
//       <Link
//         to='#'
//         onClick={() => {
//           props.deleteBlogProp(props.element._id)
//         }}>
//         <Logo
//           className=' Edit-n-Delete'
//           style={{
//             height: '25px',
//             width: '25px',
//             padding: '0px',
//             margin: '0px 10px 0px 0px',
//           }}
//         />
//       </Link>
//       {'|'}
//       <Link
//         to={`/edit/${props.element._id}/${localStorage.getItem(
//           'username'
//         )}/title=${props.element.title}&content=${props.element.content}`}>
//         <Logo1
//           className=' Edit-n-Delete'
//           style={{
//             height: '25px',
//             width: '25px',
//             padding: '0px',
//             margin: '0px 0px 0px 10px',
//           }}
//         />
//       </Link>
//       <hr />
//     </div>
//   )
// }

export default class blogListComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      obtainedData: [],
    }
    this.deleteBlogPost = this.deleteBlogPost.bind(this)
  }

  componentDidMount() {
    Axios.get(`/blog/all-blogs`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    })
      .then((res) => this.setState({ obtainedData: res.data }))
      .catch((err) => console.log(err))
  }
  deleteBlogPost(id) {
    Axios.delete(`/blog/delete/${id}`, {
      headers: { 'x-auth-token': localStorage.getItem('token') },
    })
      .then((res) => {
        console.log(res, 'deleted')
        this.setState({
          obtainedData: this.state.obtainedData.filter((el) => el._id !== id),
        })
      })
      .catch((err) => console.log(err))
  }

  render() {
    return (
      <div>
        {' '}
        <Navbar username={localStorage.getItem('username')} />
        <br />
        {this.state.obtainedData.length === 0 ? (
          <div className='alert alert-info'>
            No entries found.Click{' '}
            <Link to={`/${localStorage.getItem('username')}/create`}>here</Link>{' '}
            to create first post
          </div>
        ) : null}
        {this.state.obtainedData.map((element, index) => {
          return (
            <BlogEntry
              element={element}
              key={index}
              deleteBlogProp={this.deleteBlogPost}
            />
          )
        })}
      </div>
    )
  }
}
