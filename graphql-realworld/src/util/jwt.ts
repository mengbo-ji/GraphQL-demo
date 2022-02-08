import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'

export default {
  sign: promisify(jwt.sign),
  verify: promisify(jwt.verify),
  decode: promisify(jwt.decode),
}
