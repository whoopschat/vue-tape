const Confs = {
  qa: {
    PROD: false,
    API_SERVER: 'http://xxx.com',
  },
  pre: {
    PROD: false,
    API_SERVER: 'https://xxx.com',
  },
  prod: {
    PROD: true,
    API_SERVER: 'https://xxx.com',
  },
}

export default Confs[process.env.CONF_ENV || 'qa'] || {}
