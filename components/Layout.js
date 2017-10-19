import Header from './Header'

const layoutStyle = {
  padding: 20,
}

const Layout = (props) => (
  <div style={layoutStyle}>
    <Header url={props.url}/>
    {props.children}
  </div>
)

export default Layout