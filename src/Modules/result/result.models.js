const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resultSchema = new Schema({
  point: Number,
  refferd: [Number],
})

const rollSchema = new Schema({
  roll: {
    type: String,
    required: true,
    unique: true,
  },
  result: [resultSchema],
})

const ResultModel = mongoose.model('Result', rollSchema)

module.exports = ResultModel
