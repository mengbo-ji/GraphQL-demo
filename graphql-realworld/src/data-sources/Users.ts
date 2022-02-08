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

  saveUser(args) {
    const user = new this.model(args)
    return user.save()
  }

}