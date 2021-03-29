class NotFoundException extends Error {
  constructor() {
    super();
    this.name = 'NotFoundException';
    this.httpCode = 404;
    this.ex = { error: 'NOT_FOUND' };
    this.message = null;
  }
}

module.exports = NotFoundException;
