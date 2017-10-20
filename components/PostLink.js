import Link from 'next/link'

import {formatTime} from '../tools'

const PostLink = (props) => {
  const [, y, m, d, n] = String(props.id).match(/^(\d{4})(\d{2})(\d{2})(\d{2})/)
  const {month, date} = formatTime(props.publishTime)
  console.log(month, date)
  return (
    <li>
      <div className='title'>
        <Link as={`/posts/${y}/${m}/${d}/${n}`} href={`/post?id=${props.id}`} >
          <div>
            {props.title}
          </div>
        </Link>
        <div className="publishDate">
          {`${month}, ${date}`}
        </div>
      </div>
      <div className="titleImg" style={{
        backgroundImage: `url(${props.titleImg})`
      }}>
        
      </div>
      <div className="abstract">
        {props.abstract}
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
            background-position: center;
            background-size: cover;
            background-clip: content-box;
          }
        }
      `}</style>
    </li>
  )
}

export default PostLink