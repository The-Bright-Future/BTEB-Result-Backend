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
      const text = data.text

      const regex = /(\d+)\s+([A-Za-z\s&]+)\s+(\d+)\s+(\d+)\s+(\d+)\s+/g
      let match
      const subjects = []

      while ((match = regex.exec(text)) !== null) {
        const subjectCode = match[1]
        const subjectName = match[2].trim()
        const subjectCredit = parseInt(match[3])
        const theoryMarks = parseInt(match[4])
        const practicalMarks = parseInt(match[5])
        const totalMarks = theoryMarks + practicalMarks

        const subjectData = {
          subjectCode,
          subjectName,
          subjectCredit,
          theoryMarks,
          practicalMarks,
          totalMarks,
        }

        subjects.push(subjectData)
      }

      logger.info(JSON.stringify(subjects, null, 2))
    })
  } catch (error) {
    errorLogger.error('An error occurred:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  uploadCreateController,
}
