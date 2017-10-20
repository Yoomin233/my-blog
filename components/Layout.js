import HeaderMenu from './Header'

const Layout = (props) => (
  <div>
    <HeaderMenu url={props.url}/>
    {props.children}
  </div>
)

export default Layout