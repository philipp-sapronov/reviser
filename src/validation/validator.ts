import { THandler, IValidator, Message } from "./types";

export class Validator<T extends object> implements IValidator<T> {
  constructor(public validate: THandler<T>, public message: Message) {}
}
