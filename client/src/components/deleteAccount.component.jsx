// import React, { Component } from 'react'
// import { ReactComponent as Logo } from '../assets/skull.svg'
// import Axios from 'axios'
// import Alert from './alert.component'

// export default class deleteAccountComponent extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       success: false,
//       confirmation: '',
//     }
//     this.handleSubmit = this.handleSubmit.bind(this)
//     this.handleChange = this.handleChange.bind(this)
//     this.resetAlertFlagFunction = this.resetAlertFlagFunction.bind(this)
//   }
//   resetAlertFlagFunction(x, y) {
//     this.setState({ [y]: !x })
//   }
//   handleChange(e) {
//     const { name, value } = e.target
//     this.setState({ [name]: value })
//   }
//   handleSubmit(e) {
//     e.preventDefault()
//     if (this.state.confirmation === 'YES') {
//       Axios.post(
//         '/user/delete',
//         {},
//         {
//           headers: { 'x-auth-token': localStorage.getItem('token') },
//         }
//       )
//         .then((res) => {
//           console.log('delerted' + res)
//           this.setState({ success: true })
//           window.location.reload()
//           localStorage.clear('username')
//           localStorage.clear('token')
//         })
//         .catch((err) => console.log(err))
//     } else {
//       console.log('no')
//     }
//   }
//   render() {
//     return (
//       <div>
//         <br />
//         <form onSubmit={this.handleSubmit}>
//           {this.state.success ? (
//             <Alert
//               type='success'
//               message='Account deleted.You may now log out'
//               clickedProp={this.resetAlertFlagFunction}
//             />
//           ) : null}
//           <input
//             autoCapitalize='characters'
//             className='form-control'
//             placeholder='Type `YES` to confirm'
//             name='confirmation'
//             type='text'
//             value={this.state.username}
//             onChange={this.handleChange}
//           />
//           <br />
//           <button className='btn btn-dark btn-lg btn-block' type='submit'>
//             <Logo
//               className='navbar-brand'
//               style={{
//                 height: '2rem',
//                 width: '2rem',
//                 padding: '0px',
//                 fill: 'white',
//                 margin: '0px 15px 0px 0px',
//               }}
//             />
//             Confirm ?
//           </button>
//         </form>
//       </div>
//     )
//   }
// }

import React, { Component } from 'react'
import { ReactComponent as Logo } from '../assets/skull.svg'
import Axios from 'axios'
import Alert from './alert.component'

export default class deleteAccountComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      success: false,
      confirmation: '',
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.resetAlertFlagFunction = this.resetAlertFlagFunction.bind(this)
  }
  resetAlertFlagFunction(x, y) {
    this.setState({ [y]: !x })
  }
  handleChange(e) {
    const { name, value } = e.target
    this.setState((p) => {
      return { ...p, [name]: value }
    })
  }
  handleSubmit(e) {
    e.preventDefault()
    if (this.state.confirmation === 'YES') {
      Axios.delete(
        '/user/delete',
        { headers: { 'x-auth-token': localStorage.getItem('token') } },
        {}
      )
        .then((res) => {
          console.log(res)
          this.setState({ success: true })
          setInterval(() => (window.location = '/'), 1000)
          localStorage.removeItem('username')
          localStorage.removeItem('token')
        })
        .catch((err) => console.log(err))

      this.setState({ success: true })
      setInterval(() => (window.location = '/'), 1000)
    }
  }
  render() {
    return (
      <div>
        <br />
        <form onSubmit={this.handleSubmit} autoComplete='words'>
          {this.state.success ? (
            <Alert
              type='success'
              message='Account deleted successfuly'
              clickedProp={this.resetAlertFlagFunction}
              flag='success'
            />
          ) : null}
          <input
            autoComplete='off'
            className='form-control'
            placeholder='Type `YES` to confirm'
            name='confirmation'
            type='text'
            value={this.state.username}
            onChange={this.handleChange}
          />
          <br />
          <button className='btn btn-dark btn-lg btn-block' type='submit'>
            <Logo
              className='navbar-brand'
              style={{
                height: '2rem',
                width: '2rem',
                padding: '0px',
                fill: 'white',
                margin: '0px 15px 0px 0px',
              }}
            />
            Confirm ?
          </button>
        </form>
      </div>
    )
  }
}
