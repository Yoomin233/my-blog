import Layout from '../components/Layout'
import Link from 'next/link'

const PostLink = (props) => {
  const [, y, m, d, n] = props.id.match(/^(\d{4})(\d{2})(\d{2})(\d{2})/)
  return (
    <li>
      <Link as={`/posts/${y}/${m}/${d}/${n}`} href={`/post?id=${props.id}`} >
        <a>{props.title}</a>
      </Link>
    </li>
  )
}

const Index = () => (
  <Layout>
    <h1>My Blog</h1>
    <ul>
      <PostLink title="Hello Next.js" id={'2017101801'}/>
      <PostLink title="Hello Next.js" id={'2017101802'}/>
      <PostLink title="Hello Next.js" id={'2017101803'}/>
    </ul>
  </Layout>
)

export default Index