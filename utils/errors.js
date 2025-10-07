const DocumentNotFoundError = 404;
const ValidationError = 400;
const UnauthorizedError = 401;
const ForbiddenError = 403;
const ConflictError = 409;
const InternalServerError = 500;

class DocumentNotFoundErrorClass extends Error {
  constructor(message) {
    super(message);
    this.name = "DocumentNotFoundError";
    this.statusCode = 404;
  }
}

class UnauthorizedErrorClass extends Error {
  constructor(message) {
    super(message);
    this.name = "UnauthorizedError";
    this.statusCode = 401;
  }
}

class ForbiddenErrorClass extends Error {
  constructor(message) {
    super(message);
    this.name = "ForbiddenError";
    this.statusCode = 403;
  }
}

class NotFoundErrorClass extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFoundError";
    this.statusCode = 404;
  }
}

class ConflictErrorClass extends Error {
  constructor(message) {
    super(message);
    this.name = "ConflictError";
    this.statusCode = 409;
  }
}

class InternalServerErrorClass extends Error {
  constructor(message) {
    super(message);
    this.name = "InternalServerError";
    this.statusCode = 500;
  }
}

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
};
