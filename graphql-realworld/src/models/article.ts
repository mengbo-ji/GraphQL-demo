import * as mongoose from 'mongoose'
import baseModel from './base-model'
const Schema = mongoose.Schema

const articleSchema = new mongoose.Schema({
  ...baseModel,
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true
  },
  tagList: {
    type: [String],
    default: null
  },
  favoritesCount: {
    type: Number,
    default: 0
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
})

export default articleSchema
