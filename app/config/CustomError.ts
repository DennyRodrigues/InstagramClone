class CustomError extends Error {
  success: boolean;
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.success = false;
    this.status = status;
    Object.setPrototypeOf(this, CustomError.prototype);
  }
}

export default CustomError;

export type CustomErrorType = CustomError;


