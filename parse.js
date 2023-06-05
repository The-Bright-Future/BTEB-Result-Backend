const fs = require('fs')
const pdf = require('pdf-parse')
const { errorLogger, logger } = require('./src/shared/loger')

const pdfFilePath = './datafile/result.pdf'

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

    fs.writeFile('output.json', jsonOutput, err => {
      if (err) {
        errorLogger.error('Error writing to file:', err)
      } else {
        logger.info('JSON data written to output.json')
      }
    })
  })
  .catch(error => {
    errorLogger.error('Error parsing PDF:', error)
  })
