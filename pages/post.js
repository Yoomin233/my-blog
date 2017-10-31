import React, { Component } from 'react'
import ReactHtmlParser, {processNodes, convertNodeToElement, htmlparser2} from 'react-html-parser'

import Head from 'next/head'

import fetch from 'isomorphic-unfetch'
import {formatTime} from '../tools'

import Layout from '../components/Layout'
import Author from '../components/Author'
import ImgLightbox from '../components/ImgLightbox'

import config from '../config'

const htmlToReactNodeParseOptions = {
   transform (node, index) {
     if (node.name === 'img') {
        return (<ImgLightbox key={index}>
          <img src={node.attribs.src} alt=""/>
        </ImgLightbox>)
     }
   }
}

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
    const { id, title } = query
    const res = await fetch(`${config.baseURL}/api/post/${encodeURIComponent(id)}`)
    const article = await res.json()
    return {
      // WithPost: <p>123</p>
      article,
      title
    }
  }
  render() {
    const { article, url } = this.props
    let { title } = this.props
    title = title.replace(/\-/g, ' ')
    const {month, date} = formatTime(article.publishTime)
    return (
      <Layout url={url} headerColor={`#1490d7`} title={title}>
        <Head>
          <link rel="stylesheet" href="/static/styles/dark.css" />
        </Head>
        <div className="mainContentWrapper" style={{
          paddingTop: '100px'
        }}>
          <div className="mainContent">
            <h1>{title}</h1>
            <div>
              <p>发表时间: {month}, {date}</p>
              <div className='articleContent'>{ReactHtmlParser(article.htmlContent, htmlToReactNodeParseOptions)}
              </div>
            </div>
          </div>
          <div className="sideContent">
            <Author />
          </div>
        </div><style jsx global>{`
          div.articleContent img {
            max-width: 100%;
            min-height: 300px;
          }
          pre {
            color: #eee;
            background-color: #222;
            font-size: 1.5em;
            padding: 1em;
          }
          p > code {
            font-size: 1.2em;
            vertical-align: baseline;
            background-color: #eff;
            padding: 0 0.5em;
          }
        `}</style>
      </Layout>
    )
  }
}

export default Posts