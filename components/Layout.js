import HeaderMenu from './Header'

const Layout = (props) => (
  <div>
    <HeaderMenu url={props.url} headerColor={props.headerColor}/>
      {props.children}
    <div className="footer">
      
    </div>
  </div>
)

export default Layout