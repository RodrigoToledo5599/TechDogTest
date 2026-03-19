export class Result<T> {
  data: T | null;
  statusCode: number;
  message?: string;
  error?: any;

  constructor(
    data: T| null,
    statusCode: number,
    message?: string,
    error?: any
  ){
    this.data = data;
    this.statusCode = statusCode;
    this.message = message;
    this.error = error;

  }
}