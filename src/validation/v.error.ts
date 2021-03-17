export class ValidationError extends Error {
  constructor(public message: string, public field: string) {
    super(message);
    this.name = 'Validation Error';
  }
}
