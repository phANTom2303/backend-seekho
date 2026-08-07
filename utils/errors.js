export class AppError extends Error {
  /**
   * @param {string} message - The error message
   * @param {number} status - The HTTP status code
   */
  constructor(message, status) {
    super(message);
    this.status = status;
    this.statusCode = status;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}
