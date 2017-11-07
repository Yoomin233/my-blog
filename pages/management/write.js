import React, { Component } from 'react'

// import config from '../../config'
// import fetch from 'isomorphic-fetch'

import Layout from './Layout'

export default class ManagementIndex extends Component {
  render() {
    const {url} = this.props
    return (
      <Layout url={url}>
        <div>
          write new article here!
        </div>
      </Layout>
    )
  }
}
