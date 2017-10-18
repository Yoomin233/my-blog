import Link from 'next/link'

const Header = () => (
  <div>
    <Link href="/">
      <a>Home</a>
    </Link>
    <Link href="/about">
      <a>About</a>
    </Link>
    <style jsx>{`
      a {
        color: #666;
        text-decoration: none;
        font-size: 1.2em;
        display: inline-block;
        margin-right: 1em;
        postion: relative;
        &::before {
          content: '';
        }
      }

    `}</style>
  </div>
)

export default Header