import React, { Component } from 'react'

import Link from 'next/link'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPath: props.url.pathname
    }
  }
  render() {
    const { currentPath } = this.state
    return (
      <div className='header'>
        <Link href="/">
          <a className={currentPath === '/' ? 'selected' : ''}>Home</a>
        </Link>
        <Link href="/posts">
          <a className={currentPath === '/post' ? 'selected' : ''}>Posts</a>
        </Link>
        <Link href="/about">
          <a className={currentPath === '/about' ? 'selected' : ''}>About</a>
        </Link>
        <style jsx>{`
      .header {
        position: fixed;
        left: 0;
        top: 0;
        background-color: transparent;
        padding: 10px 20px;
        width: 100%;
      }
      a {
        color: #666;
        text-decoration: none;
        font-size: 1.5em;
        display: inline-block;
        margin-right: 1em;
        position: relative;
        padding: .3em 0;
        &::before, &.selected::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background-color: #666;
        }
        &::before {
          transform: scaleX(0);
          transition: transform .3s cubic-bezier(0, 1, 0.67, 0.99);
        }
        &.selected::after {
          top: 0;
        }
      }
      a:hover::before {
        transform: scaleX(1);
      }
    `}</style>
      </div>
    )
  }
}

export default Header