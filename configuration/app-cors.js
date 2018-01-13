const whitelist = ['http://localhost:8448', 'http://tentkeep.com', 'https://tentkeep.com']

var cors = {
  baseCors: (req, callback) => {
    const origin = req.header('Origin')
    console.log(origin)
    if (whitelist.indexOf(origin) > -1) {
      callback(null, { origin: true })
    } else {
      console.log(`rejected: ${req.path}`)
      callback(new Error('Not allowed by CORS'))
    }
  }
}

module.exports = cors
