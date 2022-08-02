import bcrypt from 'bcrypt'
export interface IEncrypter {
  encrypt(value: string): Promise<string>
  compare(valueToCompare: string, originalEncripted: string): Promise<boolean>
}
export class Encrypter implements IEncrypter {
  async encrypt(value: string): Promise<string> {
    const saltRounds = 10
    const salt = await bcrypt.genSalt(saltRounds)
    return await bcrypt.hash(value, salt)
  }
  async compare(
    valueToCompare: string,
    originalEncripted: string,
  ): Promise<boolean> {
    return await bcrypt.compare(valueToCompare, originalEncripted)
  }
}
