import React, { Component } from 'react'

import fetch from 'isomorphic-unfetch'

import Layout from '../components/Layout'

import marked from 'marked'
import Hightlight from 'react-highlight'

marked.setOptions({
  gfm: true,
  tables: true,
  breaks: true
})

const Content = (props) => (
  <div>
    <h1>{props.url.query.id}</h1>
    <div>
      <p>{props.articleInfo.publishTime}</p>
    </div>
    <div className="content">
      {props.content}
    </div>
  </div>
)

class Posts extends Component {
  static async getInitialProps({ query }) {
    const { id } = query
    const res = await fetch(`http://localhost:3000/api/post/${id}`)
    const article = await res.json()
    return {
      // WithPost: <p>123</p>
      article
    }
  }
  render() {
    const { article } = this.props
    return (
      <Layout>
        <h1>{article.id}</h1>
        <div>
          <p>{article.publishTime}</p>
          <div dangerouslySetInnerHTML={{__html: marked(article.content)}}>
          </div>
        </div>
      </Layout>
    )
  }
}

export default Posts