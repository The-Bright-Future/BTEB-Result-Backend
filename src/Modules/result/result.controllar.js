const fs = require('fs')
const pdf = require('pdf-parse')
const { errorLogger, logger } = require('../../shared/loger')
const ResultModel = require('./result.models')
const util = require('util')

const uploadCreateController = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' })
      return
    }

    // Access uploaded file details
    const { filename } = req.file

    const pdfFilePath = `./uploadsResult/${filename}`

    pdf(fs.readFileSync(pdfFilePath))
      .then(data => {
        const output = {}
        const rollRegex = /(\d+)\s\(([\d.]+)\)/g
        const subjectsRegex = /(\d+)\s{([^{}]+)}/g
        let match

        while ((match = rollRegex.exec(data.text)) !== null) {
          const roll = match[1]
          const result = match[2]
          // const [_, roll, result] = match

          output[roll] = {
            roll: parseInt(roll),
            result: [
              {
                point: parseFloat(result),
                referred: [],
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
            output[roll].result[0].referred = subjectCodes
          } else {
            output[roll] = {
              roll: parseInt(roll),
              result: [
                {
                  point: null,
                  referred: subjectCodes,
                },
              ],
            }
          }
        }

        const jsonOutput = JSON.stringify(output, null, 4)
        // logger.info(util.inspect(output, { depth: null }))

        //Save to database
        if (jsonOutput !== '{}' && jsonOutput !== 'null') {
          const resultData = output // Use the 'output' object directly instead of parsing the JSON
          const promises = []

          for (const roll in resultData) {
            if (Object.prototype.hasOwnProperty.call(resultData, roll)) {
              const result = new ResultModel({
                roll: resultData[roll].roll,
                result: resultData[roll].result,
              })
              promises.push(result.save())
            }
          }

          Promise.all(promises)
            .then(savedResults => {
              logger.info('Result saved to database')
              return res.status(200).json({
                success: true,
                message: 'Result saved to database',
                data: savedResults,
              })
            })

            .catch(error => {
              errorLogger.error('Error saving result to database:', error)
              return res
                .status(500)
                .json({ error: 'Failed to save result to database' })
            })
        }
      })
      .catch(error => {
        errorLogger.error('Error parsing PDF:', error)
        return res.status(500).json({ error: 'Failed to parse PDF' })
      })
  } catch (error) {
    errorLogger.error('An error occurred:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  uploadCreateController,
}
