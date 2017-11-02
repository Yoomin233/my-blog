import React, { Component } from 'react'
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser'

import Head from 'next/head'

import fetch from 'isomorphic-unfetch'
import { formatTime } from '../tools'

import Layout from '../components/Layout'
import Author from '../components/Author'
import ImgLightbox from '../components/general/ImgLightbox'

import config from '../config'

const htmlToReactNodeParseOptions = {
  transform(node, index) {
    if (node.name === 'img') {
      return <ImgLightbox src={node.attribs.src} key={index} />
    }
  }
}

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
    const { month, date } = formatTime(article.publishTime)
    return (
      <Layout url={url} headerColor={`#1490d7`} title={title}>
        <Head>
          <link rel="stylesheet" href="/static/styles/atelier-heath-light.css" />
        </Head>
        <div className="mainContentWrapper" style={{
          paddingTop: '100px'
        }}>
          <div className="mainContent">
            <h1>{title}</h1>
            <div>
              <p>发表时间: {month}, {date}</p>
              <div className='articleContent'>
                {
                  ReactHtmlParser(article.htmlContent, htmlToReactNodeParseOptions)
                }
              </div>
            </div>
          </div>
          <div className="sideContent">
            <Author />
          </div>
        </div><style jsx global>{`
          div.articleContent img {
            width: 100%;
            min-height: 300px;
            cursor: zoom-in;
            border-radius: 5px;
            box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
          }
          div.articleContent {
            font-size: 1.2em;
            text-align: justify;
            p > code {
              background-color: #fef;
              padding: 0 .5em;
            }
          }
          pre.hljs {
            overflow: hidden;
            padding: 0;
          }
          pre {
            font-size: 1.2em;
            color: #eee;
            background-color: #222;
            position: relative;
            box-shadow: 0px 0px 10px 1px rgba(0,0,0,0.2);
            border-radius: 5px;
            &::before {
              content: '';
              position: absolute;
              left: 0;
              top: 0;
              display: block;
              width: 5px;
              background-color: #d1c3f2;
              height: 100%;
            }
            code {
              display: block;
              width: 100%;
              overflow-x: scroll;
              padding: 1em 1em 1em calc(1em + 5px);
            }
          }
        `}</style>
      </Layout>
    )
  }
}

export default Posts