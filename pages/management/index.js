import React, { Component } from 'react'

// import config from '../../config'
// import fetch from 'isomorphic-fetch'

import Layout from './Layout'

export default class ManagementIndex extends Component {
  static async getInitialProps({req}) {
    // client-side, login -> management page using Router.push
    // server-side (direct visit)
    const user = {}
    if (req) {
      user.username = 'yoomin'
      user.auth = 'super'
    // else, through link, go and get login info (with cookies attached)
    } else {
      // const userInfo = await fetch('/api/user')
      user.username = 'yoomin'
      user.auth = 'super'
    }
    return {
      message: 'this Management father Component!',
      user
    }
  }
  render() {
    const { url } = this.props
    return (
      <Layout url={url}>
        <div>
          {this.props.message}
        </div>
      </Layout>
    )
  }
}
