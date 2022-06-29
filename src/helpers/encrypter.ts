export interface IEncrypter {
  encrypt(value: string): string
  compare(valueToCompare: string, originalEncripted: string): boolean
}
