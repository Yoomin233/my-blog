import React, { Component } from 'react'

import Link from 'next/link'

import { debounce } from '../tools'

class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentPath: props.url.pathname,
      className: 'headerMenu'
    }
    this.setHeaderClassName = debounce(this.setHeaderClassName, 100)
  }
  componentDidMount() {
    document.addEventListener('scroll', this.setHeaderClassName, { passive: true })
    this.setHeaderClassName()
  }
  setHeaderClassName = (e) => {
    const { top } = document.documentElement.getBoundingClientRect()
    if (top < -200) {
      this.setState({
        className: 'headerMenu minified'
      })
    } else {
      this.setState({
        className: 'headerMenu'
      })
    }
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.setHeaderClassName)
  }
  render() {
    const { currentPath, className } = this.state
    const {headerColor} = this.props
    return (
      <div className={className} style={{
        color: headerColor
      }}>
        <Link href="/">
          <a>My Blog</a>
        </Link>
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
      .headerMenu {
        position: fixed;
        left: 0;
        top: 0;
        background-color: transparent;
        padding: 10px 20px;
        width: 100%;
        font-size: 1.5em;
        transition: all .3s ease;
        display: flex;
        align-items: center;
        box-sizing: border-box;
        > a:first-child {
          font-size: 1.6em;
          flex-grow: 1;
        }
        a {
          color: inherit;
          text-shadow: 0 0 1px rgba(0,0,0,0.1);
        }
        &.minified {
          font-size: 1.2em;
          background-color: rgba(255, 255, 255, 0.8);
          box-shadow: 0px 0px 15px rgba(0,0,0,0.3);
          a {
            color: #444;
            &::before, &::after {
              background-color: #444;
            }
          }
        }
      }
      a {
        text-decoration: none;
        margin-right: 1em;
        position: relative;
        padding: .3em 0;
        &:not(:first-child)::before, &.selected::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background-color: #fff;
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

Header.defaultProps = {
  headerColor: '#fff',
}

export default Header