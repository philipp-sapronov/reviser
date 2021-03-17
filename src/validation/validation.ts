import { Message, IValidation, IValidator } from "./types";
import { TypeUtils } from "../utils/types";

export class Validation<T extends object> implements IValidation<T> {
  public isValidation: true;

  protected $isNullable: boolean;
  protected $validators: IValidator<T>[];
  protected $message: string | undefined;

  constructor(message?: Message) {
    this.$message = message;
    this.isValidation = true;
    this.$validators = [];
    this.$isNullable = false;
  }

  get message() {
    return this.$message;
  }

  get isNullable() {
    this.$isNullable = true;
    return this;
  }

  validate(value: unknown, data: T): boolean {
    if (TypeUtils.isNullOrUndefined(value)) {
      return this.$isNullable;
    }

    let result = true;

    this.$validators.forEach((validator) => {
      if (!result) return;

      result = validator.validate(value as T[keyof T], data);

      if (!result) {
        this.$message = validator.message;
      }
    });

    return result;
  }
}
