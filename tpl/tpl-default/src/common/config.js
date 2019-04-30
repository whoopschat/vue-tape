const Conf = {
  qa: {
    PROD: false,
    XXX: 'QA XXX',
  },
  pre: {
    PROD: false,
    XXX: 'PRE XXX',
  },
  prod: {
    PROD: true,
    XXX: 'PROD XXX',
  },
}

export default Conf[process.env.VUE_APP_CURRENTMODE || 'qa'] || {}
