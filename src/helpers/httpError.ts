type HttpErrorParams = {
  status: number
  message: string
}
export class HttpError extends Error {
  status: number

  constructor(params: HttpErrorParams) {
    super(params.message)
    this.name = 'HttpError'
    this.message
    this.status = params.status
  }
}
