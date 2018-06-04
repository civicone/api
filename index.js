const express = require('express')
const morgan = require('morgan-debug')
const bodyParser = require('body-parser')
const debug = require('debug')

const routes = require('./routes')

const log = debug('civic:api')
const PORT = process.env.PORT || 8080
const app = express()

log('starting')

app.use(morgan('civic:api:route', 'combined'))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

app.use('/issues', routes.issues)

app.listen(PORT, () => log(`API listening on port ${PORT}`))
