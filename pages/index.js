import Layout from '../components/Layout'
import Link from 'next/link'
import fetch from 'isomorphic-fetch'

import React, { Component } from 'react'

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
    // const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    // const data = await res.json()

    // console.log(`Show data fetched. Count: ${data.length}`)

    // return {
    //   shows: data
    // }
    return {}
  }
  render() {
    const { shows, url } = this.props
    return (
      <Layout url={url}>
        <h1>My Blog</h1>
        <ul>
          <PostLink title="Hello Next.js" id={'2017101801'} />
          <PostLink title="Hello Next.js" id={'2017101802'} />
          <PostLink title="Hello Next.js" id={'2017101803'} />
        </ul>
      </Layout>
    )
  }
}

export default Index