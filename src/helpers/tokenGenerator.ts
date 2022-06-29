export interface ITokenGenerator {
  encode(value: string): string
  decode(token: string): string
}
