const ConnectDB = require('../Database/DBConnect')
const app = require('../src/app/app')
const { logger, errorLogger } = require('../src/shared/loger')
const PORT = process.env.PORT || 8000

///////////////////////////////////////////////
//           DB Connection And Local         //
/////////////////////////////////////////////*/

app.get('/api/v1', (req, res) => {
  res.send('Hey Wellcome to API Server')
})

ConnectDB()
  .then(() => {
    logger.info('Connected to database ')
  })
  .catch(err => {
    errorLogger.error('Cannot connect to database', err)
  })

app.listen(PORT, () => {
  logger.info(`Server is running at port ${PORT}`)
})

///////  End of DB Connection And Local  ////////
