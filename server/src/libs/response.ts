class Response {
  statusCode: number;
  message?: string;

  constructor(statusCode: number, message?: string) {
    this.statusCode = statusCode;
    this.message = message;
  }
}

export class ApiResponse<T extends object> extends Response {
  data?: T;
  message?: string;

  constructor(statusCode: number, data?: T, message?: string) {
    super(statusCode, message);
    this.data = data;
  }
}

export class ApiResponseMessage extends Response {
  constructor(statusCode: number, message: string) {
    super(statusCode, message);
  }
}

export class ApiError extends Error {
  statusCode: number;
  message: string;
  stack?: string | undefined;
  errors?: string[];

  constructor(
    statusCode: number,
    message: string,
    errors?: string[],
    stack?: string | undefined
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    if (errors) {
      this.errors = errors;
    }
    if (stack) {
      this.stack = stack;
    }
  }
}
