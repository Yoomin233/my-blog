import Link from 'next/link'

export default () => (
  <div>
    <p>this is about page</p>
    <Link href='/' >
      <p style={{ color: 'red' }}>index page</p>
    </Link>
  </div>
)
