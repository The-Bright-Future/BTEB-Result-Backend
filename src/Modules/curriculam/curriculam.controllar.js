const fs = require('fs')
const pdf = require('pdf-parse')
const { errorLogger, logger } = require('../../shared/loger')
const CurriculamModel = require('./curriculam.models')

const uploadCreateController = async (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' })
      return
    }

    // Access uploaded file details
    const { filename } = req.file

    const pdfFilePath = `./uploadsCurriculam/${filename}`

    pdf(fs.readFileSync(pdfFilePath)).then(data => {
      // Extract the table rows using regular expressions
      const tableRegex =
        /(\d+)\s+(.*?)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)\s+(\d+)/g
      let match
      const tableData = []

      while ((match = tableRegex.exec(data.text)) !== null) {
        const row = {
          slNo: match[1],
          subject: match[2],
          code: match[3],
          name: match[4],
          tpC: match[5],
          marksTotal: match[6],
          theoryPractical: match[7],
          contAssessFinalExam: match[8],
        }

        tableData.push(row)
      }

      logger.info(JSON.stringify(tableData, null, 2))
      // Process the extracted table data as needed

      // Save the data to the database using the CurriculamModel

      return res.status(200).json({
        success: true,
        message: 'Data extracted successfully',
        data: tableData,
      })
    })
  } catch (error) {
    errorLogger.error('An error occurred:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  uploadCreateController,
}
