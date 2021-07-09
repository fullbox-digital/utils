import bcrypt from 'bcrypt'

export abstract class HashingHelper {
  static async hash (plainText: string, salt = 12): Promise<string> {
    return await bcrypt.hash(plainText, salt)
  }

  static async compare (plainText: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(plainText, hash)
  }
}
