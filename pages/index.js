import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'

import React, { Component } from 'react'

import headerImg from './i-should-buy-a-boat.jpg'

const PostLink = (props) => {
  const [, y, m, d, n] = props.id.match(/^(\d{4})(\d{2})(\d{2})(\d{2})/)
  return (
    <li>
      <Link as={`/posts/${y}/${m}/${d}/${n}`} href={`/post?id=${props.id}`} >
        <a>{props.title}</a>
      </Link>
    </li>
  )
}

class Index extends Component {
  static async getInitialProps(props) {
    const res = await fetch('http://localhost:3000/api/post/list')
    const data = await res.json()

    return {
      articleList: data
    }
    return {}
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
          <ul>
            <PostLink title="Hello Next.js" id={'2017101801'} abstract={'this is '}/>
            <PostLink title="Hello Next.js" id={'2017101802'} />
            <PostLink title="Hello Next.js" id={'2017101803'} />
          </ul>
        </div>
        <style jsx>{`
          
        `}</style>
      </Layout>
    )
  }
}

export default Index