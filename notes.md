### getting started
js files inside [pages](./pages) will be mapped to the routes(export react component or pure function components)

sub folders will be mapped to the subroutes

### navigate
use `<Link></Link>` wrapper component to do the client-side navigation. it works with any underlying elements(`a, p, button...`)

### using shared components
see [this file](./pages/index.js). it imports shared components from other directory. 

### creating dynamic pages
page root components will receive props containing `asPath, back, pathname, query, replace` etc to help you to create dynamic pages. 

### clean URLs with route masking
it will show different URL on the browser than the actual URL that your app receives. 
use `as` prop in `<Link>` component
```javascript
  <Link as={`/p/${props.id}`} href={`/post?title=${props.title}`}>
    <a>{props.title}</a>
  </Link>
```
#### 404 handling
try reloading `as` paths will result in a 404 error. fix this using [custom server API](https://github.com/zeit/next.js#custom-server-and-routing)

### clean URLs server side support
```javascript
server.get('/posts/:y/:m/:d/:n', (req, res) => {
  const actualPage = '/post'
  const queryParams = {id: `${req.params.y}${req.params.m}${req.params.d}${req.params.n}`}
  app.render(req, res, actualPage, queryParams)
})
```
using custom express API to render the page

### get initial props
`getInitialProps` called on the client side when navigating to this page; it gets called on the server side when direct visit; page refresh. 

### styled-jsx