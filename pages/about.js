import Layout from '../components/Layout'
import Entrance from '../components/withAnimation'

const About = (props) => (
  <Layout url={props.url} headerColor={`#1490d7`}>
    <div className="mainContentWrapper">
      <div className="mainContent">
        <h1>关于我</h1>
        <Entrance 
          beforeEnter={{transform: 'translateX(50%)', opacity: 0}}
          duration={'0.8s'}
          timingFunc={'ease-in-out'}
          stagger={500}
        >
          <p> - 野生前端攻城狮</p>
          <p> - 不是完美主义者</p>
          <p> - 离开谷歌和油管就会死星人</p>
          <p> - 并不是一只<a href='/' alt='你知道的太多了'>单身狗</a></p>
          <p> - 算得上是半个<a href='https://zh.moegirl.org/zh-hans/%E7%BB%85%E5%A3%AB'>绅士</a></p>
          <p className='social'><span>Github</span><span>Mail</span><span>Facebook</span></p>
        </Entrance>
      </div>
      <div className="sideContent">

      </div>
    </div>
    <style jsx>{`
      .mainContentWrapper {
        padding: 7rem;
      }
      .social {
        span {
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
        }
      }
    `}</style>
  </Layout>
)

export default About