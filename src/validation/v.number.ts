import { Message } from "./types";
import { Validator } from "./Validator";
import { Validation } from "./Validation";
import { TypeUtils } from "../utils/types";

export class VNumber<T extends object> extends Validation<T> {
  constructor(message?: Message) {
    super(message);
    this.$validators = [];
    this.$validators.push(new Validator((value: unknown) => TypeUtils.isNumber(value), message));
  }

  public min(x: number, message: Message) {
    this.$validators.push(
      new Validator((value: unknown) => {
        if (!TypeUtils.isNumber(value)) return false;
        return value >= x;
      }, message)
    );
  }

  public max(x: number, message: Message) {
    this.$validators.push(
      new Validator((value: unknown) => {
        if (!TypeUtils.isNumber(value)) return false;
        return value >= x;
      }, message)
    );
  }
}
