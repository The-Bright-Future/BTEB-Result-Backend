const { info } = require("winston")

// result.controller.js
const uploadCreateController = (req, res) => {
  try {
    if (!req.file) {
      res.status(400).json({ error: 'No file uploaded' })
      return
    }

    // Access uploaded file details
    const { filename, mimetype, size } = req.file

    // Perform desired operations with the uploaded file, such as saving to a database or processing it

    res.json({
      filename,
      mimetype,
      size,
      message: 'File uploaded successfully',
    })
  } catch (error) {
    info.error('An error occurred:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

module.exports = {
  uploadCreateController,
}
