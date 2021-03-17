import { IValidation } from "./types";
import { Validation } from "./Validation";
import { TypeUtils } from "../utils/types";

export class VIntersection<T extends object> extends Validation<T> {
  private readonly $validations: IValidation<T>[];

  constructor(validations: IValidation<T>[], message?: string) {
    super(message);
    this.$validations = validations;
  }

  validate(value: unknown, data: T): boolean {
    if (TypeUtils.isNullOrUndefined(value)) {
      return this.$isNullable;
    }

    const results = this.$validations.map((validation) =>
      validation.validate(value as T[keyof T], data)
    );

    const isValid = results.includes(true);

    if (!isValid) {
      this.$message =
        this.$validations[results.findIndex((valid) => !valid)]?.message ||
        this.$message;
    }

    return isValid;
  }
}
