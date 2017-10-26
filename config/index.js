const config = {
  'development': {
    baseURL: 'http://192.168.26.216:3000'
  },
  'production': {
    baseURL: 'http://192.168.26.216:1024'
  }
}

export default config[process.env.NODE_ENV || 'development']