import * as mongoose from 'mongoose'
import { DB_URL } from '../config'
import user from './user'
import article from './article'

// 连接 MongoDB 数据库
mongoose.connect(DB_URL)

const db = mongoose.connection

// 当连接失败的时候
db.on('error', err => {
  console.log('MongoDB 数据库连接失败', err)
})

// 当连接成功的时候
db.once('open', function () {
  console.log('MongoDB 数据库连接成功')
})

export const User = mongoose.model('User', user)
export const Article = mongoose.model('Article', article)
