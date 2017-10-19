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
        position: relative;
        padding: .3em 0;
        &::before {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 1px;
          background-color: #666;
          transform: scaleX(0);
          transition: transform .3s cubic-bezier(0, 1, 0.67, 0.99);
        }
      }
      a:hover::before {
        transform: scaleX(1);
      }
    `}</style>
  </div>
)

export default Header