import { THandler, Message } from "./types";
import { Validator } from "./Validator";
import { Validation } from "./Validation";

export class VHandler<T extends object> extends Validation<T> {
  constructor(validator: THandler<T>, message?: Message) {
    super(message);
    this.$validators = [];
    this.$validators.push(new Validator(validator, message));
  }
}
