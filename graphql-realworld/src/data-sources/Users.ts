// @ts-nocheck
import { MongoDataSource } from 'apollo-datasource-mongodb'

export default class Users extends MongoDataSource {
  findByEmail(email) {
    return this.model.findOne({
      email
    })
  }

  findByUsername(username) {
    return this.model.findOne({
      username
    })
  }

  findById(id) {
    return this.model.findOne({
      _id: id
    })
  }

  saveUser(args) {
    const user = new this.model(args)
    return user.save()
  }

}