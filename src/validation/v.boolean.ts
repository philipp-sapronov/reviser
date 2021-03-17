import { TypeUtils } from "../utils/types";
import { Message } from "./types";
import { Validator } from "./Validator";
import { Validation } from "./Validation";

export class VBoolean<T extends object> extends Validation<T> {
  constructor(message?: Message) {
    super(message);
    this.$validators.push(new Validator((value: unknown) => TypeUtils.isBoolean(value), message));
  }

  public isTrue(message?: Message) {
    this.$validators.push(new Validator((value: unknown) => value === true, message));
    return this;
  }

  public isFalse(message?: Message) {
    this.$validators.push(new Validator((value: unknown) => value === false, message));
    return this;
  }
}
