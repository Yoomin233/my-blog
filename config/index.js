const config = {
  'development': {
    baseURL: 'http://localhost:3000'
  },
  'production': {
    baseURL: 'http://47.94.196.246'
  }
}

export default config[process.env.NODE_ENV || 'development']
