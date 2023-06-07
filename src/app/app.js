const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const ResultRouter = require('../Modules/result/result.router')
const app = express()

///////////////////////////////////////////////
//           Middilwaire Use                 //
/////////////////////////////////////////////*/
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))
app.use(cors())

// =========== //

app.use('/api/v1/', ResultRouter)

///////     End of Middilwaire Use    ////////

module.exports = app
