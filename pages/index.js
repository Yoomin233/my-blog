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
          <ul className='postList'>
            {
              articleList.list.map((item, index) => (
                <PostLink title={item.title} id={item.publishTime} abstract={item.abstract} titleImg={item.titleImg} publishTime={item.publishTime} key={index}/>
              ))
            }
          </ul>
          <div className="sideContent">

          </div>
        </div>
        <style jsx>{`
          .mainContentWrapper > * {
            display: inline-block;
            padding: 10px;
          }
          .postList {
            width: 60%;
          }
          .sideContent {
            height: 120px;
            width: 40%;
            vertical-align: top;
          }
          @media screen and (max-width: 640px) {
            .mainContentWrapper > * {
              display: block;
            }
            .postList, .sideContent {
              width: 100%;
            }
          }
        `}</style>
      </Layout>
    )
  }
}

export default Index