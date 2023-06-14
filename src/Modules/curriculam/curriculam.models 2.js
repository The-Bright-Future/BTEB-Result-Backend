const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultSchema = new Schema({
    point: {
        type: Number,
        default: null,
    },
    referred: [Number],
})

const rollSchema = new Schema({
    roll: {
        type: Number,
        required: true,
        unique: true,
    },
    result: [resultSchema],
})

const ResultModel = mongoose.model('Result', rollSchema)

module.exports = ResultModel

