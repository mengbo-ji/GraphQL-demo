import * as mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: String,
  age: Number
});

export default mongoose.model('User', userSchema)