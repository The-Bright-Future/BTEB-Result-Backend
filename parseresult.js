const fs = require('fs')
const pdf = require('pdf-parse')
const mongoose = require('mongoose')
const { errorLogger, logger } = require('./src/shared/loger')

const pdfFilePath = 'path/to/your/pdf/file.pdf'

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

// Define a schema for the data
const ResultSchema = new mongoose.Schema({
  roll: Number,
  result: [
    {
      point: Number,
      refferd: [Number],
    },
  ],
})

// Create a model based on the schema
const ResultModel = mongoose.model('Result', ResultSchema)

pdf(fs.readFileSync(pdfFilePath))
  .then(data => {
    const output = {}
    const rollRegex = /(\d+)\s\(([\d.]+)\)/g
    const subjectsRegex = /(\d+)\s\{([^{}]+)\}/g

    let match

    while ((match = rollRegex.exec(data.text)) !== null) {
      const roll = match[1]
      const result = match[2]

      output[roll] = {
        roll: parseInt(roll),
        result: [
          {
            point: parseFloat(result),
            refferd: [],
          },
        ],
      }
    }

    while ((match = subjectsRegex.exec(data.text)) !== null) {
      const roll = match[1]
      const subjectCodes = match[2].match(/\d+/g).map(code => parseInt(code))

      if (output[roll]) {
        output[roll].result[0].refferd = subjectCodes
      } else {
        output[roll] = {
          roll: parseInt(roll),
          result: [
            {
              point: null,
              refferd: subjectCodes,
            },
          ],
        }
      }
    }

    const jsonOutput = JSON.stringify(output, null, 4)

    // Save the JSON data to the MongoDB collection
    ResultModel.insertMany(JSON.parse(jsonOutput), err => {
      if (err) {
        errorLogger.error('Error saving to MongoDB:', err)
      } else {
        logger.log('Data saved to MongoDB')
      }

      // Disconnect from MongoDB
      mongoose.disconnect()
    })
  })
  .catch(error => {
    errorLogger.error('Error parsing PDF:', error)
  })
