import { ValidationError } from "./v.error";
import { TSchema } from "./types";
import { keys } from "../utils";

export class Schema<T extends object> {
  constructor(public readonly schema: TSchema<T>) {}

  public validate<R extends T>(
    data: T,
    onError?: (data: T[keyof T], field: keyof T) => void
  ): data is R {
    const fields = keys(this.schema);

    fields.forEach((field) => {
      const validation = this.schema[field];

      if (!validation.isValidation) {
        throw new ReferenceError(`Schema field ${field} has invalid validation handler`);
      }

      if (!validation.validate(data[field], data)) {
        onError?.(data[field], field);
        throw new ValidationError(validation.message, field as string);
      }
    });

    return true;
  }
}
