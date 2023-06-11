const mongoose = require('mongoose')
const { database_url } = require('../config')
require('dotenv').config()

const dbUri = `${database_url}`


mongoose.set('strictQuery', false)
module.exports = () => {
  return mongoose.connect(dbUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
}
