const pdfParse = require('pdf-parse')
const ResultModel = require('./result.models')
const { logger, errorLogger } = require('../../shared/loger')

const uploadCreateController = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No PDF file found')
    }

    const pdfFile = req.file

    pdfParse(pdfFile.buffer)
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
          const subjectCodes = match[2]
            .match(/\d+/g)
            .map(code => parseInt(code))

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

        // Save the JSON data to MongoDB using Mongoose
        ResultModel.create(output)
          .then(() => {
            logger.info('JSON data saved to MongoDB')
            res.send({
              status: 200,
              success: true,
              message: 'Result uploaded successfully',
            })
          })
          .catch(error => {
            errorLogger.error('Error saving JSON data to MongoDB:', error)
            res.status(500).send({
              status: 500,
              success: false,
              message: 'An error occurred while saving the result',
            })
          })
      })
      .catch(error => {
        errorLogger.error('Error parsing PDF:', error)
        res.status(500).send({
          status: 500,
          success: false,
          message: 'An error occurred while parsing the PDF',
        })
      })
  } catch (error) {
    errorLogger.error('Error processing PDF data:', error)
    res.status(500).send('An error occurred while processing the PDF data')
  }
}

module.exports = {
  uploadCreateController,
}
