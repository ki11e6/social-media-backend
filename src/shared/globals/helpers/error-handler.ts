import HTTP_STATUS from 'http-status-codes';

//framework for error response
export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

//framework for serializeErrors method
export interface IError {
  message: string;
  statusCode: number;
  status: string;
}

//CustomeError extands from Error a buildin class
export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      statusCode: this.statusCode
    };
  }
}

export class JoiRequestValidationError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

//400 BAD_REQUEST: This status can occur if there are issues with the client's request, such as invalid input data.
export class BadRequestError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

//404 NOT_FOUND: This status code may be returned when a user tries to access a resource that doesn't exist .
export class NotFoundError extends CustomError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

//401  UNAUTHORIZED: If a user is not authenticated or authorized to perform a certain action, this status code may be returned.
export class NotAuthorizedError extends CustomError {
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

//403 FORBIDDEN: This status can occur when a user tries to access content or perform actions that they do not have permission to do.
export class ForbiddenError extends CustomError {
  statusCode = HTTP_STATUS.FORBIDDEN;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

//413 REQUEST_ENTITY_TOO_LARGE: This status code when a client sends a request that exceeds the server's specified size limits.
export class FileTooLargeError extends CustomError {
  statusCode = HTTP_STATUS.REQUEST_TOO_LONG;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

//500 INTERNAL_SERVER_ERROR: This status code indicates a server-side error, which could occur occasionally but should be minimized for a smooth user experience.
export class InternalServerError extends CustomError {
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}

//503 SERVICE_UNAVAILABLE: Return this status during maintenance or when the server is temporarily overloaded.
export class ServerError extends CustomError {
  statusCode = HTTP_STATUS.SERVICE_UNAVAILABLE;
  status = 'error';

  constructor(message: string) {
    super(message);
  }
}
