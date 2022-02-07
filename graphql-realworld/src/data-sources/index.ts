// @ts-nocheck
import Users from './Users'
import Articles from './Articles'
import {
  User,
  Article
} from '../models'

export default () => {
  return {
    users: new Users(User),
    Articles: new Articles(Article),
  }
}