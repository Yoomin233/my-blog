import Head from 'next/head'
import HeaderMenu from './Header'

const Layout = (props) => (
  <div>
    <Head>
      <title>{props.title}</title>
    </Head>
    <HeaderMenu url={props.url} headerColor={props.headerColor}/>
      {props.children}
    <div className="footer">
      
    </div>
  </div>
)

Layout.defaultProps = {
  title: 'title not set!'
}

export default Layout