const express = require('express')
const next = require('next')

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare()
  .then(() => {
    const server = express()

    // express-first
    server.get('/posts/:y/:m/:d/:n', (req, res) => {
      const actualPage = '/post'
      const queryParams = {id: `${req.params.y}${req.params.m}${req.params.d}${req.params.n}`}
      app.render(req, res, actualPage, queryParams)
    })

    // article id enquiry
    server.get('/api/post/:id', (req, res) => {
      res.send({
        status: 'success',
        id: req.params.id,
        content: '<p>empty article</p>',
        publishTime: Date.now()
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