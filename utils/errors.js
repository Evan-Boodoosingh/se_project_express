const DocumentNotFoundError = 404;
const ValidationError = 400;
const UnauthorizedError = 401;
const ForbiddenError = 403;
const ConflictError = 409;
const InternalServerError = 500;

// Factory function that creates custom error objects
const createError = (message, statusCode, name) => {
  const error = new Error(message);
  error.name = name;
  error.statusCode = statusCode;
  return error;
};

// Specific error factory functions
const DocumentNotFoundErrorClass = (message) =>
  createError(message, 404, "DocumentNotFoundError");

const UnauthorizedErrorClass = (message) =>
  createError(message, 401, "UnauthorizedError");

const ForbiddenErrorClass = (message) =>
  createError(message, 403, "ForbiddenError");

const NotFoundErrorClass = (message) =>
  createError(message, 404, "NotFoundError");

const ConflictErrorClass = (message) =>
  createError(message, 409, "ConflictError");

const InternalServerErrorClass = (message) =>
  createError(message, 500, "InternalServerError");

module.exports = {
  DocumentNotFoundError,
  ValidationError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
  InternalServerError,
  DocumentNotFoundErrorClass,
  UnauthorizedErrorClass,
  ForbiddenErrorClass,
  NotFoundErrorClass,
  ConflictErrorClass,
  InternalServerErrorClass,
  createError,
};
