const express = require('express')
const router = express.Router()
const { uploadCreateController } = require('./result.controllar')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads') // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Use the original filename for the uploaded file
    },
    })

const upload = multer({ storage })

// Define the routes
router.post('/result-upload', upload.single('pdfFile'), uploadCreateController)

module.exports = router
