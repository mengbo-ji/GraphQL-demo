// @ts-nocheck
import { MongoDataSource } from 'apollo-datasource-mongodb/dist'

export default class Users extends MongoDataSource {
  getUser(userId) {
    return this.findOneById(userId)
  }
  getUsers() {
    return this.model.find()
  }
}