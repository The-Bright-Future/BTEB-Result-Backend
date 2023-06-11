const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const resultRouter = require('../Modules/result/result.router')

///////////////////////////////////////////////
//           Middilwaire Use                 //
/////////////////////////////////////////////*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.use('/api/v1', resultRouter)

// =========== //

///////     End of Middilwaire Use    ////////



module.exports = app
