const mongoose = require('mongoose')
const { database_url } = require('../config')
const { logger } = require('../src/shared/loger')
require('dotenv').config()

const dbUri = `${database_url}`

logger.info('DB URI: ' + database_url)

mongoose.set('strictQuery', false)
module.exports = () => {
  return mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
