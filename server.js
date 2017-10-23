const fs = require('fs')

// express middlewares
const express = require('express')
const cors = require('cors')

const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()
    server.use(cors())
    // express-first
    server.get('/posts/:y/:m/:d/:n', (req, res) => {
      const actualPage = '/post'
      const queryParams = {id: `${req.params.y}${req.params.m}${req.params.d}${req.params.n}`}
      app.render(req, res, actualPage, queryParams)
    })

    // article list
    server.get('/api/post/list', (req, res) => {
      const articleList = JSON.parse(fs.readFileSync('./articles/articleList.json', 'utf-8'))
      res.json(articleList)
    })

    // article id enquiry
    server.get('/api/post/:id', (req, res) => {
      res.send({
        status: 'success',
        id: req.params.id,
        content: `This is our blog post.
Yes. We can have a [link](/link).
And we can have a title as well.

\`\`\`javascript
const ab = 3
var {
  123456
}
\`\`\`

### This is a title
And here's the content.`,
        publishTime: Date.now(),
        type: 'markdown'
      })
    })

    server.get('*', (req, res) => handle(req, res))


    server.listen(3000, err => {
      if (err) throw err
      console.log('> Ready on http://localhost:3000')
    })

  })
  .catch(ex => {
    console.log(ex.stack)
    process.exit(1)
  })