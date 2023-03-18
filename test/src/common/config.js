
const Config = {
  local: {
    ENV: 'LOCAL',
    PROD: false,
  },
  qa: {
    XXX: 'QA',
    PROD: false,
  },
  pre: {
    XXX: 'PRE',
    PROD: false,
  },
  prod: {
    XXX: 'PROD',
    PROD: true,
  },
}

export default Config[process.env.VUE_APP_CURRENTMODE || 'local'] || {}
