export class ApiError extends Error {
  constructor({ message, status, errors = {} }) {
    super(message);

    this.status = status;
    this.errors = errors;
  }

  static badRequest(message, errors) {
    return new ApiError({ message, errors, status: 400 });
  }

  static notFound(errors) {
    return new ApiError({
      message: 'not found',
      errors,
      status: 404,
    });
  }

  static fromSequelizeUnique(error) {
    if (error.name !== 'SequelizeUniqueConstraintError') {
      throw error;
    }

    const errorMap = {};

    for (const err of error.errors) {
      errorMap[err.path] = 'Already taken';
    }

    return ApiError.badRequest('Unique constraint error', errorMap);
  }
}
