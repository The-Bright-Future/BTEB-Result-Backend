const path = require('path')
require('dotenv').config({ path: path.join(process.cwd() + '/.env') })

module.exports = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 8080,
  database_url: process.env.DB_URI,
}
