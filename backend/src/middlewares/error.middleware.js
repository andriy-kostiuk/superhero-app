import { ApiError } from '../exceptions/api.error.js';

export const errorMiddleware = (err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({
      message: 'Invalid JSON payload',
    });
  }

  if (err instanceof ApiError) {
    res.status(err.status).send({
      message: err.message,
      errors: err.errors,
    });

    return;
  }

  if (err) {
    res.statusCode = 500;

    res.send({
      message: 'Server error',
      err,
    });
  }
};
