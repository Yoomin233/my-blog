// import React from 'react'
// import Layout from '../components/Layout'

// import marked from 'marked'
// import Hightlight from 'react-highlight'

// marked.setOptions({
//   gfm: true,
//   tables: true,
//   breaks: true
// })

// export default function WithPost (options) {
//   return class PostPage extends React.Component {
//     render () {
//       return (
//         <Layout>
//           <h1>{options.id}</h1>
//           <div>
//             <p>{options.publishTime}</p>
//             <Hightlight>
//               {marked(options.content)}
//             </Hightlight>
//           </div>
//         </Layout>
//       )
//     }
//   }
// }