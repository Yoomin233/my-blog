import Layout from '../components/Layout'

// import '../styles/style.css'

export default () => (
  <Layout>
    <p>about page!</p>
    {/* <div className="container">
      <div className="screen">

      </div>
      <div className="base">
        <div className="rounds">

        </div>
      </div>
    </div> */}
    <style jsx>{`
      .container {
        width: 200px;
        height: 200px;
        perspective: 300px;
        position: relative;
        border: 1px solid #ddd;
        margin: auto;
      }
      .screen {
        width: 80%;
        height: 80%;
        margin: 10% 10%;
        position: absolute;
        background-color: lightblue;
        z-index: 2;
      }
      .base {
        width: 100%;
        height: 70%;
        margin-top: 40%;
        position: absolute;
        z-index: 3;
        background-color: lightpink;
        transform-origin: center top;
      }
      .rounds {
        width: 80%;
        height: 50%;
        position: absolute;
        left: 10%;
        top: 25%;
        background-color: #fff;
        transform-origin: center;
        border-radius: 50%;
      }
      .rounds::before {
        content: '';
        display: block;
        width: 5%;
        border-radius: 50%;
        padding-top: 5%;
        background-color: #000;
        position: absolute;
        left: 47.5%;
        transform: translateY(-50%);
      }
      @keyframes spin {
        to {
          transform: rotate(360deg)
        }
      }
    `}</style>
  </Layout>
)
