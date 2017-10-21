import fetch from 'isomorphic-fetch'

import React, { Component } from 'react'
import Layout from '../components/Layout'
import PostLink from '../components/PostLink'

import headerImg from './i-should-buy-a-boat.jpg'

class Index extends Component {
  static async getInitialProps(props) {
    const res = await fetch('http://localhost:3000/api/post/list')
    const data = await res.json()

    return {
      articleList: data
    }
  }
  render() {
    const { articleList, url } = this.props
    return (
      <Layout url={url}>
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