import React, { Component } from 'react'

import Layout from '../components/Layout'
import Markdown from 'react-markdown'

import fetch from 'isomorphic-unfetch'

const Content = (props) => (
  <div>
    <h1>{props.url.query.id}</h1>
    <div>
      <p>{props.articleInfo.publishTime}</p>
    </div>
    <div className="content">
      <Markdown source={props.articleInfo.content} />
    </div>
  </div>
)

class Posts extends Component {
  static async getInitialProps ({query}) {
    const {id} = query
    const res = await fetch(`http://localhost:3000/api/post/${id}`)
    const content = await res.json()
    console.log(content)
    return {
      articleInfo: content
    }
  }
  render() {
    return (
      <Layout>
        <Content {...this.props} />
      </Layout>
    )
  }
}

export default Posts