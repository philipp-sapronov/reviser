import { Message } from "./types";
import { Validator } from "./Validator";
import { Validation } from "./Validation";

export class VDate<T extends object> extends Validation<T> {
  constructor(message?: Message) {
    super(message);
    this.$validators = [];
    this.$validators.push(new Validator((date: unknown) => date instanceof Date, message));
  }
}
