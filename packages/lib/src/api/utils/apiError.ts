export class ApiError extends Error {
  statusCode: number;

  constructor(
    statusCode: number,
    message: string,
    public readonly name: string = "ApiError",
    stack?: string
  ) {
    super(message);
    this.statusCode = statusCode;

    this.name = name;
    this.message = message;
    this.stack = stack || new Error().stack || undefined;
  }
}
