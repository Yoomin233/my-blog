import Layout from '../components/Layout'

const Content = (props) => (
  <div>
    <h1>{props.url.query.id}</h1>
    <p>This is the blog post content</p>
  </div>
)

const Posts = (props) => (
  <Layout>
    <Content {...props}/>
  </Layout>
)

export default Posts