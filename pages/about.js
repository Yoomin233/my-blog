import Layout from '../components/Layout'
import { Entrance } from '../components/withAnimation/index'
import Author from '../components/Author'

const About = (props) => (
  <Layout url={props.url} headerColor={`#1490d7`} title={'关于 | Yoomin\'s Blog'}>
    <div className="mainContentWrapper">
      <div className="mainContent">
        <h1>关于我</h1>
        <Entrance
          beforeEnter={{ transform: 'translateX(50%)', opacity: 0 }}
          duration={'0.8s'}
          timingFunc={'ease-in-out'}
          stagger={200}
        >
          <p> - 野生前端攻城狮</p>
          <p> - 不是完美主义者</p>
          <p> - 离开谷歌和油管就会死星人</p>
          <p> - 并不是一只<a href='/' title='你知道的太多了'>单身狗</a></p>
          <p> - 算得上是半个<a href='https://zh.moegirl.org/zh-hans/%E7%BB%85%E5%A3%AB' target='_blank'>绅士</a></p>
          <p className='social'>
            <a className='icon-github-square' href='https://github.com/YueminHu/' target='_blank'>Github</a>
            <a className='icon-gmail' href='mailto:hym920408@gmail.com'>Mail</a>
            <a className='icon-facebook' href='https://www.facebook.com/profile.php?id=100006231496977' target='_blank'>Facebook</a>
          </p>
        </Entrance>
      </div>
      <div className="sideContent">
        <Author />
      </div>
    </div>
    <style jsx>{`
      .mainContentWrapper {
        padding: 7rem;
      }
      @media screen and (max-width: 640px) {
        .mainContentWrapper {
          padding: 7rem 0 0;
        }
      }
      .mainContent {
        > p {
          font-size: 1.2em;
        }
      .social {
        a {
          display: inline-block;
          margin-right: 1em;
          padding: .5em;
          color: #fff;
          border-radius: 5px;
          &:first-child {
            background-color: #f66bcc;
          }
          &:nth-child(2) {
            background-color: #5f69eb;
          }
          &:nth-child(3) {
            background-color: #2cd371;
          }
          &[class*='icon-']::before {
            vertical-align: sub;
            font-size: 1.2em;
            margin-right: .5em;
          }
        }
      }
      }
    `}</style>
  </Layout>
)

export default About