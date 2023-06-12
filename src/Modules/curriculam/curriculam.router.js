const express = require('express')
const router = express.Router()
const { uploadCreateController } = require('./curriculam.controllar')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploadsCurriculam') // Set the destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname) // Use the original filename for the uploaded file
    },
})

const upload = multer({ storage })

// Define the routes
router.post('/curriculam-upload', upload.single('pdfFile'), uploadCreateController)

const curriculamRouter = router

module.exports = curriculamRouter
