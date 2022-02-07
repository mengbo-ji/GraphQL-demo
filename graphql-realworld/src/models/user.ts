import * as mongoose from 'mongoose'
import baseModel from './base-model'
import md5 from '../util/md5'

const userSchema = new mongoose.Schema({
  ...baseModel,
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    set: (value: string) => md5(value),
    // select: false
  },
  bio: {
    type: String,
    default: null
  },
  image: {
    type: String,
    default: null
  }
})

export default userSchema
