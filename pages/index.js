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
    const res = await fetch('https://api.tvmaze.com/search/shows?q=batman')
    const data = await res.json()

    console.log(`Show data fetched. Count: ${data.length}`)

    return {
      shows: data
    }
  }
  render() {
    const { shows } = this.props
    return (
      <Layout>
        <h1>My Blog</h1>
        <ul>
          <PostLink title="Hello Next.js" id={'2017101801'} />
          <PostLink title="Hello Next.js" id={'2017101802'} />
          <PostLink title="Hello Next.js" id={'2017101803'} />
        </ul>
        <h1>batman tv shows</h1>
        <ul>
          {
            shows.map(item => (
              <li key={item.show.id}>
                {item.show.name}
              </li>
            ))
          }
        </ul>
        <style jsx global>{`
          a {
            color: #666;
            text-decoration: none;
            font-size: 1.2em;
            display: inline-block;
            margin-right: 1em;
            position: relative;
            padding: .3em 0;
            &::before {
              content: '';
              position: absolute;
              left: 0;
              bottom: 0;
              width: 100%;
              height: 1px;
              background-color: #666;
              transform: scaleX(0);
              transition: transform .3s cubic-bezier(0, 1, 0.67, 0.99);
            }
          }
          a:hover::before {
            transform: scaleX(1);
          }
        `}</style>
      </Layout>
    )
  }
}

export default Index