import { Message } from "./types";
import { Validator } from "./Validator";
import { Validation } from "./Validation";
import { TypeUtils } from "../utils/types";

export class VFile<T extends object> extends Validation<T> {
  constructor(message?: Message) {
    super(message);
    this.$validators.push(new Validator((value: unknown) => value instanceof File, message));
  }

  public min(x: number, message: Message) {
    this.$validators.push(
      new Validator((value: unknown) => {
        if (!TypeUtils.isFile(value)) return false;
        return value.size >= x;
      }, message)
    );
  }

  public max(x: number, message: Message) {
    this.$validators.push(
      new Validator((value: unknown) => {
        if (!TypeUtils.isFile(value)) return false;
        return value.size >= x;
      }, message)
    );
  }
}
