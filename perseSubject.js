const fs = require('fs')
const PDFParser = require('pdf-parse')
const { logger, errorLogger } = require('./src/shared/loger')

// Read the PDF file
const pdfBuffer = fs.readFileSync('./datafile/DiplomaEnggProbidhan_2016.pdf')

// Parse the PDF content
PDFParser(pdfBuffer)
  .then(data => {
    // Extract the required information from the parsed data
    const extractedData = {
      subjectCode: data.text.match(/subjectCode: (.+)/)[1],
      subjectName: data.text.match(/subjectName: (.+)/)[1],
      subjectCredit: parseInt(data.text.match(/subjectCredit: (\d+)/)[1]),
      theoryMarks: parseInt(data.text.match(/theoryMarks: (\d+)/)[1]),
      practicalMarks: parseInt(data.text.match(/practicalMarks: (\d+)/)[1]),
      totalMarks: parseInt(data.text.match(/totalMarks: (\d+)/)[1]),
    }

    // Convert the extracted data to JSON format
    const jsonData = JSON.stringify(extractedData, null, 2)

    // Write the JSON data to a file
    fs.writeFileSync('output.json', jsonData)

    logger.info('PDF converted to JSON successfully!')
  })
  .catch(error => {
    errorLogger.error('An error occurred:', error)
  })
