class HttpException extends Error {
  public statusCode: number;
  public message: string;
  public error: string;
  public body: any;
  constructor(message: string, statusCode: number, body?: any) {
    super(message);
    this.name = 'HttpException';
    this.error = this.stack;
    this.statusCode = statusCode;
    this.message = message;
    this.body = body;
  }
}
export default HttpException;
