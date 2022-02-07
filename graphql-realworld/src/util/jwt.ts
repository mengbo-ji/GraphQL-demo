import * as jwt from 'jsonwebtoken'
import { promisify } from 'util'

export const sign = promisify(jwt.sign)

export const verify = promisify(jwt.verify)

export const decode = promisify(jwt.decode)
