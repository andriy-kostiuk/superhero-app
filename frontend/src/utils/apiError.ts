export class ApiError extends Error {
  status: number;
  errors?: Record<string, unknown>;

  constructor(
    message: string,
    status: number,
    errors?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.errors = errors;
  }
}
