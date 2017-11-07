import React, {Component} from 'react'

import Link from 'next/link'

export default class Layout extends Component {
  render () {
    const pathname = this.props.url ? this.props.url.pathname.replace('/management', '') : ''
    return (
      <div className='wrapper'>
        <div className="side">
          <Link href='/management'>
            <p className={`${pathname === '' && 'selected'}`}>index</p>
          </Link>
          <Link href='/management/write'>
            <p className={`${pathname === '/write' && 'selected'}`}>new article</p>
          </Link>
          <Link href='/management/stat'>
            <p className={`${pathname === '/stat' && 'selected'}`}>stat</p>
          </Link>
        </div>
        <div className="content">
          {this.props.children}
        </div>
        <style jsx>{`
          div.wrapper {
            width: 100vw;
            height: 100vh;
            display: flex;
            flex-direction: row;
          }
          div.side {
            width: 10em;
            height: 100%;
            border-right: 1px solid #666;
            color: #999b93;
            background-color: #191919;
            > p {
              padding: 10px;
              margin: 0;
              background-color: inherit;
              border-bottom: 1px solid #444;
              cursor: pointer;
              font-family: sans-serif;
              &:hover, &.selected {
                background-color: black;
              }
            }
          }
          div.content {
            flex-grow: 1;
            display: flex;
            flex-direction: column;
          }
        `}
        </style>
      </div>
    )
  }
}