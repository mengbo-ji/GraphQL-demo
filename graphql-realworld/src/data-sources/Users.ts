// @ts-nocheck
import { MongoDataSource } from 'apollo-datasource-mongodb'

export default class Users extends MongoDataSource {
  getUser(userId) {
    return this.findOneById(userId)
  }
  getUsers() {
    return this.model.find()
  }
}