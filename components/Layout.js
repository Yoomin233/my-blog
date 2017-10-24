import Head from 'next/head'
import HeaderMenu from './Header'

const Layout = (props) => (
  <div>
    <Head>
      <title>{props.title}</title>
    </Head>
    <HeaderMenu url={props.url} headerColor={props.headerColor} />
    {props.children}
    <div className="footer">
      <a className="goHead icon-arrow-up" href='#'>

      </a>
      <p>Created with <span style={{ color: '#ef4361'}}>❤︎</span> by <a href="https://github.com/YueminHu/" target='_blank'>Yuemin.Hu</a>. With React and Next.js</p>
    </div>
    <style jsx>{`
      .footer {
        height: 50px;
        text-align: center;
        position: relative;
        background-color: #ccc;
        > .goHead {
          position: absolute;
          color: #ccc;
          left: 0;
          right: 0;
          margin: auto;
          top: -1em;
          font-size: 2em;
          cursor: pointer;
        }
        > p {
          line-height: 50px;
        }
      }
    `}
    </style>
  </div>
)

Layout.defaultProps = {
  title: 'title not set!'
}

export default Layout