const fs = require("fs-extra");
const http = require("http");
const https = require("https");
const path = require("path");
const url = require("url");
const cookie = require("cookie");

// express middlewares
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const session = require("express-session");
const bodyParser = require("body-parser");
const next = require("next");

// modules needed
const MemoryStore = require("./memoryStore");

const cookieStore = new MemoryStore();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handler = app.getRequestHandler();

// https certificates
const key = fs.readFileSync(
  path.join(__dirname, "./sslcert/214253111870115.key"),
  "utf8"
);
const cert = fs.readFileSync(
  path.join(__dirname, "./sslcert/214253111870115.crt"),
  "utf8"
);
const credentials = {
  key,
  cert
};

// tools for markdown handling
const marked = require("marked");
const hightligt = require("highlight.js");
const renderer = new marked.Renderer();

//custom html render results
renderer.code = (code, language) => `<pre class='hljs'>
  <code class='lang-${language}'>${hightligt.highlightAuto(code).value}</code>
</pre>`;
renderer.image = (href, title, text) => `<img src=${href} />`;
renderer.link = (href, title, text) =>
  `<a href=${href} target='${
    /yoominhu\.site/.test(href) ? "" : "_blank"
  }'>${text}</a>`;
marked.setOptions({
  renderer,
  gfm: true,
  tables: true,
  breaks: true
});

app
  .prepare()
  .then(() => {
    const server = express();
    // apply middlewares
    server.use(cors());
    server.use(compression());
    server.use(bodyParser.urlencoded({ extended: false }));
    server.use(bodyParser.json());
    // server.use(express.cookieParser())
    // server.use(session({
    //   secret: 'secret',
    //   resave: false,
    //   saveUninitialized: true,
    //   cookie: {
    //     path: '/_next'
    //   },
    //   name: 'nextCookie'
    // }))
    // server.use(session({
    //   secret: 'secret',
    //   resave: false,
    //   saveUninitialized: true,
    //   cookie: {
    //     path: '/api'
    //   },
    //   name: 'cookieName'
    // }))

    // manual write cookie
    server.get("*", (req, res, next) => {
      const cookies = cookie.parse(req.headers.cookie || "");
      const siteCookie = cookies.siteCookie;
      if (!siteCookie) {
        const id =
          Math.random()
            .toString(16)
            .slice(2) + Date.now();
        const clientInfo = {
          visit: 1,
          auth: "visitor"
        };
        cookieStore.set(id, clientInfo);
        res.setHeader(
          "Set-Cookie",
          cookie.serialize("siteCookie", id, {
            httpOnly: true,
            maxAge: 60 * 60 * 24 * 7
          })
        );
        req.cookie = clientInfo;
      } else {
        const data = cookieStore.get(siteCookie);
        if (data && data.visit) {
          data.visit += 1;
          req.cookie = data;
        } else {
          // server restart
          const clientInfo = {
            visit: 1,
            auth: "visitor"
          };
          cookieStore.set(siteCookie, clientInfo);
          req.cookie = clientInfo;
        }
      }
      next();
    });

    // express-first
    // pages
    // post pages, direct access
    server.get("/posts/:y/:m/:d/:n", (req, res) => {
      const actualPage = "/post";
      // props to be passed to the react Posts component
      const queryParams = {
        id: `${req.params.y}${req.params.m}${req.params.d}-${req.params.n}`,
        title: `${req.params.n.replace(/\..*/, "")}`
      };
      app.render(req, res, actualPage, queryParams);
    });

    // apis
    // article list
    server.get("/api/post/list", async (req, res) => {
      const articleList = JSON.parse(
        await fs.readFile("./articles/articleList.json", "utf-8")
      );
      const offset = req.query["offset"] || 0;
      const size = req.query["size"] || 10;
      articleList.list = articleList.list.slice(offset, offset + size);
      // articleList.total = 21
      res.json(articleList);
    });

    // article id enquiry
    server.get("/api/post/:id", async (req, res) => {
      try {
        const fileName = path.resolve(
          "./articles",
          decodeURIComponent(req.params.id)
        );
        const mdContent = await fs.readFile(fileName, "utf-8");
        const htmlContent = marked(mdContent);
        const stat = await fs.stat(fileName);
        res.send({
          status: "success",
          id: req.params.id,
          htmlContent,
          publishTime: stat.birthtime,
          type: "markdown"
        });
      } catch (e) {
        console.log(e);
        res.end(e);
      }
    });

    // query user
    server.get("/api/user", (req, res) => {
      if (req.cookie) {
        res.json(req.cookie);
      } else {
        res.json({
          data: "no user found!"
        });
      }
    });

    server.get("*", (req, res) => handler(req, res));

    const httpServer = http.createServer(server);
    const httpsServer = https.createServer(server);
    const httpPort = dev ? 3000 : 80;
    const httpsPort = dev ? 8443 : 443;

    httpServer.listen(httpPort, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${httpPort}`);
    });

    httpsServer.listen(httpsPort, err => {
      if (err) throw err;
      console.log(`> Ready on https://localhost:${httpsPort}`);
    });
  })
  .catch(ex => {
    console.log(ex.stack);
    process.exit(1);
  });
