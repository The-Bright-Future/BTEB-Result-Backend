const mongoose = require('mongoose')
const Schema = mongoose.Schema

const subjectSchema = new Schema({
    subjectCode: {
        type: String,
        required: true,
        unique: true,
    },
    subjectName: {
        type: String,
        required: true,
    },
    subjectCredit: {
        type: Number,
        required: true,
    },
    theoryMarks: {
        type: Number,
        required: true,
    },
    practicalMarks: {
        type: Number,
        required: true,
    },
    totalMarks: {
        type: Number,
        required: true,
    },
})

const Subject = mongoose.model('Subject', subjectSchema)

module.exports = Subject

