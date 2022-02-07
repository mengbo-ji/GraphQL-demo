// @ts-nocheck
import { MongoDataSource } from 'apollo-datasource-mongodb'

export default class Articles extends MongoDataSource {
  createArticle (data) {
    const article = new this.model(data)
    return article.save()
  }

  getArticles (options) {
    return this.model.find().skip(options.offset).limit(options.limit)
  }

  getCount () {
    return this.model.countDocuments()
  }
}
