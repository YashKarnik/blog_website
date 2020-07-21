import React, { Component } from 'react'
import './styles.css'
import LandingPage from './components/landingPage.component'
import LoginPage from './components/login.component'
import RegisterPage from './components/register.component'
import Footer from './components/footer.component'
import CreateBlogPage from './components/createBlog.component'
import BlogList from './components/blogList.component'
import BlogPageFull from './components/blogPageFull.component'
import UserList from './components/user.list.component'
import Settings from './components/settings.component'
import Logout from './components/logout.component'
import EditBlog from './components/edit.blog.component'
import OtherUser from './components/otherUser.component'
import OtherUserBlogPageFull from './components/otherUserBlogPageFull.component'
import Credits from './components/credits'
import { BrowserRouter as Router, Route } from 'react-router-dom'

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className='container-fluid container'>
          <Route path='/' exact component={LandingPage} />
          <Route path='/Login' exact component={LoginPage} />
          <Route path='/Register' exact component={RegisterPage} />
          <Route path='/:username/create' exact component={CreateBlogPage} />
          <Route path='/:username/myBlogs' exact component={BlogList} />
          <Route path='/:username/myBlogs/:id' exact component={BlogPageFull} />
          <Route path='/:username/allusers' exact component={UserList} />
          <Route
            path='/:username/allusers/:OtherUserId'
            exact
            component={OtherUser}
          />
          <Route
            path='/:username/allusers/:OtherUserId/:OtherUserBlogID'
            exact
            component={OtherUserBlogPageFull}
          />

          <Route path='/:username/settings' exact component={Settings} />
          <Route path='/:username/logout' exact component={Logout} />
          <Route
            path='/edit/:id/:username/title=:title&content=:content'
            exact
            component={EditBlog}
          />
          <Route path='/credits' exact component={Credits} />
        </div>
        <Footer />
      </Router>
    )
  }
}
