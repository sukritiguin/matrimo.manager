export class ApiError extends Error {
  statusCode: number;

  constructor(statusCode: number, message: string, stack?: string) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.stack = stack || new Error().stack || undefined;
  }
}
