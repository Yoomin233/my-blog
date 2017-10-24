import React, { Component } from 'react'
import Link from 'next/link'

import DotLoading from '../components/withAnimation/DotLoading'
import Fade from '../components/withAnimation/Fade'

import { formatTime } from '../tools'

class PostLink extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageLoaded: false
    }
  }
  componentDidMount() {
    const { titleImg } = this.props
    const postLinkImg = new Image()
    postLinkImg.onload = (e) => this.setState({ imageLoaded: true })
    postLinkImg.src = titleImg
  }
  render() {
    const { fileName, mtime, title, titleImg, abstract } = this.props
    const { imageLoaded } = this.state
    const [, y, m, d, n] = String(fileName).match(/^(\d{4})(\d{2})(\d{2})\-(.*)$/)
    const { month, date } = formatTime(mtime)
    return (
      <li>
        <div className='title'>
          <Link as={`/posts/${y}/${m}/${d}/${n}`} href={`/post?id=${fileName}`} >
            <div>
              {title}
            </div>
          </Link>
          <div className="publishDate">
            {`${month}, ${date}`}
          </div>
        </div>
        <div className="titleImg">
          {
            imageLoaded ?
              <Fade fadeIn={true} whenInViewPort={true}>
                <div className="img" style={{
                  backgroundImage: `url(${titleImg})`
                }}></div>
              </Fade>
              :
              <DotLoading />
          }
        </div>
        <div className="abstract">
          {abstract}
        </div>
        <style jsx>{`
        li {
          padding: 10px;
          color: #444;
          > * {
            padding-bottom: 10px;
          }
          .title {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            > div:first-child {
              font-size: 1.6em;
              &:hover {
                color: #1490d7;
                cursor: pointer;
              }
            }
          }
          .titleImg {
            width: 100%;
            height: 200px;
            div.img {
              width: 100%;
              height: inherit;
              background-position: center;
              background-size: cover;
              background-clip: content-box;
            }
          }
        }
      `}</style>
      </li>
    )
  }
}

export default PostLink