import { UserInputError } from 'apollo-server-express'
import { JWT_SECRET } from '../config';
import * as jwt from 'jsonwebtoken'
import md5 from '../util/md5';

export const resolvers = {
  Query: {
    foo: () => 'hello'
  },
  Mutation: {
    async createUser(parent: any, { user }: any, { dataSources }: any) {
      const users = dataSources.users
      const currentUserEmail = await users.findByEmail(user.email)
      // 判断邮箱是否存在
      if (currentUserEmail) {
        throw new UserInputError('邮箱已存在')
      }
      const currentUsername = await users.findByUsername(user.username)
      // 判断用户是否存在
      if (currentUsername) {
        throw new UserInputError('用户已存在')
      }
      // 保存用户
      const ret = await users.saveUser(user)
      // 生成token发送给客户端
      const token = await jwt.sign({
        userId: ret._id
      }, JWT_SECRET, { expiresIn: 60 * 60 * 24 })
      return {
        user: {
          ...ret.toObject(),
          token
        }
      }
    },
    async login(parent: any, { user }: any, { dataSources }: any) {
      const users = dataSources.users
      const current = await users.findByEmail(user.email)
      // 判断邮箱是否存在
      if (!current) {
        throw new UserInputError('邮箱不存在')
      }
      // 判断密码
      if (md5(user.password) !== current.password) {
        throw new UserInputError('密码错误')
      }
      // 生成token发送给客户端
      const token = await jwt.sign({
        userId: current._id
      }, JWT_SECRET, { expiresIn: 60 * 60 * 24 })
      return {
        user: {
          ...current.toObject(),
          token
        }
      }
    } 
  }
};