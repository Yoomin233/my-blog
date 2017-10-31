const config = {
  'development': {
    baseURL: 'http://localhost:3000'
  },
  'production': {
    baseURL: 'http://www.yoominhu.site'
  }
}

export default config[process.env.NODE_ENV || 'development']