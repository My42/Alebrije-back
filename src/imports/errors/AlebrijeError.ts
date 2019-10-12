class AlebrijeError extends Error {
  code: string;

  constructor(code: string, message: string) {
    super(message);
    Object.setPrototypeOf(this, AlebrijeError.prototype);
    this.code = code;
  }
}

export default AlebrijeError;
