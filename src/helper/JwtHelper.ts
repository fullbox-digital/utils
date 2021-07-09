import jwt from 'jsonwebtoken'

export abstract class JwtHelper {
  static async encrypt <T extends object> (payload: T): Promise<string> {
    const jwtKey = process.env.JWT_KEY
    if (!jwtKey) { throw new Error('JWT Key is required!') }

    return jwt.sign(payload, jwtKey)
  }

  static async decrypt<T> (plainText: string): Promise<T> {
    const jwtKey = process.env.JWT_KEY
    if (!jwtKey) { throw new Error('JWT Key is required!') }

    return jwt.verify(plainText, jwtKey) as T
  }
}
