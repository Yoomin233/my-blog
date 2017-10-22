import Layout from '../components/Layout'
import WithAnimation from '../components/withAnimation'

const About = (props) => (
  <Layout url={props.url} headerColor={`#1490d7`}>
    <div className="mainContentWrapper">
      <div className="mainContent">
        <h1>关于我</h1>
        <WithAnimation>
          <p className='hehda123'> - 野生前端攻城狮</p>
          <p> - 不是完美主义者</p>
          <p> - 离开谷歌和油管就会死星人</p>
          <p> - 并不是一只<a href='/' alt='你知道的太多了'>单身狗</a></p>
        </WithAnimation>
      </div>
      <div className="sideContent">

      </div>
    </div>
    <style jsx>{`
      .mainContentWrapper {
        padding: 7rem;
      }
    `}</style>
  </Layout>
)

export default About