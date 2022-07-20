import jwt from 'jsonwebtoken'
import 'dotenv/config';
export interface ITokenGenerator {
  encode(value: string | Object): string
  decode(token: string): string
}
export const TIME_IN_HOURS_DEFAULT = 2
 class TokenGenerator implements ITokenGenerator {
  secret: string
  constructor() {
    const secret = process.env.API_SECRET
    if (secret === undefined) {
      throw new Error('secret not found')
    }
    this.secret = secret
  }
  encode(value: string): string {
    return jwt.sign(
      {data: value,},
      this.secret,{ expiresIn: TIME_IN_HOURS_DEFAULT * 60 * 60})
  }
  decode(token: string): string {
    return jwt.verify(token, this.secret)
  }
}
const tokenGenerator = new TokenGenerator()
export {tokenGenerator}