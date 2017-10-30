import React, { Component } from 'react'

import fetch from 'isomorphic-fetch'

import config from '../config'

import Layout from '../components/Layout'
import PostLink from '../components/PostLink'
import Author from '../components/Author'

// import headerImg from './i-should-buy-a-boat.jpg'

class Index extends Component {
  static async getInitialProps(props) {
    const { req } = props
    const res = await fetch(`${config.baseURL}/api/post/list`)
    const data = await res.json()
    return {
      articleList: data,
      isServer: !!req
    }
  }
  render() {
    const { articleList, url, isServer } = this.props
    return (
      <Layout url={url} title={'首页 | Yoomin\'s Blog'}>
        <div className="header">
          <div className="headerImg" style={{
            backgroundImage: `url(http://ww1.sinaimg.cn/mw690/6d9c4e0fgy1fl0ch0ofxxj21z4140hdw.jpg)`,
          }}>
          </div>
        </div>
        <div className="mainContentWrapper">
          <div className="mainContent">
            <ul className='postList'>
              {
                articleList.list.map((item, index) => (
                  <PostLink title={item.title} fileName={item.fileName} abstract={item.abstract} titleImg={item.titleImg} mtime={item.mtime} key={index} isServer={isServer}/>
                ))
              }
            </ul>
          </div>
          <div className="sideContent">
            <Author />
          </div>
        </div>
        <style jsx>{`
          div.header {
            height: 40vh;
            overflow: hidden;
            > div.headerImg {
              height: 100%;
              background-position: center;
              background-size: cover;
            }
          }
        `}</style>
      </Layout>
    )
  }
}

export default Index
