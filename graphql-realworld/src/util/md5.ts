import * as crypto from 'crypto'

export default (str: string) => {
  return crypto.createHash('md5')
    .update('mengbo' + str)
    .digest('hex')
}