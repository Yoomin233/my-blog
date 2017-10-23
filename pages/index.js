import React, { Component } from 'react'

import fetch from 'isomorphic-fetch'

import config from '../config'

import Layout from '../components/Layout'
import PostLink from '../components/PostLink'
import Author from '../components/Author'

import headerImg from './i-should-buy-a-boat.jpg'

class Index extends Component {
  static async getInitialProps(props) {
    const res = await fetch(`${config.baseURL}/api/post/list`)
    const data = await res.json()

    return {
      articleList: data
    }
  }
  render() {
    const { articleList, url } = this.props
    return (
      <Layout url={url} title={'首页 | Yoomin\'s Blog'}>
        <div className="header">
          <div className="headerImg" style={{
            backgroundImage: `url(${headerImg})`,
          }}>
          </div>
        </div>
        <div className="mainContentWrapper">
          <div className="mainContent">
            <ul className='postList'>
              {
                articleList.list.map((item, index) => (
                  <PostLink title={item.title} id={item.publishTime} abstract={item.abstract} titleImg={item.titleImg} publishTime={item.publishTime} key={index}/>
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