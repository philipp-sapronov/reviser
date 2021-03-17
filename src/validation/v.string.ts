import { Message } from "./types";
import { Validator } from "./Validator";
import { Validation } from "./Validation";
import { TypeUtils } from "../utils/types";
import { keys } from "../utils";
import { ComparableOptions, ComparableUtils } from "../utils/comparable";

class StringUtils {
  static email() {}
  static url() {}
}

export class VString<T extends object> extends Validation<T> {
  constructor(message?: Message) {
    super(message);
    this.$validators = [];
    this.$validators.push(new Validator((value: unknown) => TypeUtils.isString(value), message));
  }

  public length(options: ComparableOptions, message?: string) {
    const handlers: Validator<T>[] = [];

    keys(options).forEach((optionKey) => {
      const handler = ComparableUtils[optionKey];
      const optionValue = options[optionKey];

      if (!TypeUtils.isNumber(optionKey)) {
        return console.error(`Option ${optionKey} should be a number`);
      }

      handlers.push(
        new Validator((value: unknown) => handler((value as string)?.length, optionValue), message)
      );
    });

    this.$validators = this.$validators.concat(handlers);
    return this;
  }

  public email(message: Message) {
    this.$validators.push(new Validator(StringUtils.email, message));
    return this;
  }

  public url(message: Message) {
    this.$validators.push(new Validator(StringUtils.url, message));
    return this;
  }

  public min(x: number, message: Message) {
    this.$validators.push(
      new Validator((value: unknown) => {
        if (!TypeUtils.isString(value)) return false;
        return value.length >= x;
      }, message)
    );
  }

  public max(x: number, message: Message) {
    this.$validators.push(
      new Validator((value: unknown) => {
        if (!TypeUtils.isString(value)) return false;
        return value.length >= x;
      }, message)
    );
  }

  public pattern(regexp: RegExp, message: Message) {
    this.$validators.push(
      new Validator((value: unknown) => {
        if (!TypeUtils.isString(value)) return false;
        return regexp.test(value);
      }, message)
    );
  }
}
