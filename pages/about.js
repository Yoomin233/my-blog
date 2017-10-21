import Layout from '../components/Layout'

// import '../styles/style.css'

const About = (props) => (
  <Layout url={props.url} headerColor={`#1490d7`}>
    <div className="mainContentWrapper">
      <div className="mainContent">
        <p>this is about me!</p>
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