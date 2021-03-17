import { THandler, Message, TSchema, IValidation } from "./types";
import { Schema } from "./Schema";
// validations
import { VHandler } from "./v.handler";
import { VString } from "./v.string";
import { VBoolean } from "./v.boolean";
import { VFile } from "./v.file";
import { VNumber } from "./v.number";
import { VDate } from "./v.date";
import { VUnion } from "./v.union";
import { VIntersection } from "./v.intersection";

export abstract class Reviser {
  private constructor() {}

  static schema<T extends object>(schema: TSchema<T>) {
    return new Schema(schema);
  }

  static combineSchemas<T extends object>(schemas: Schema<T>[]) {
    return new Schema<T>(
      schemas.reduce(
        (schemas, current) => ({ ...schemas, ...current.schema }),
        {} as TSchema<T>
      )
    );
  }

  static handler<T extends object>(handler: THandler<T>, message?: Message) {
    return new VHandler<T>(handler, message);
  }

  static string<T extends object>(message?: Message) {
    return new VString<T>(message);
  }

  static date<T extends object>(message?: Message) {
    return new VDate<T>(message);
  }

  static number<T extends object>(message?: Message) {
    return new VNumber<T>(message);
  }

  static boolean<T extends object>(message?: Message) {
    return new VBoolean<T>(message);
  }

  static file<T extends object>(message?: Message) {
    return new VFile<T>(message);
  }

  static OR<T extends object>(
    validations: IValidation<T>[],
    message?: Message
  ) {
    return new VUnion<T>(validations, message);
  }

  static AND<T extends object>(
    validations: IValidation<T>[],
    message?: Message
  ) {
    return new VIntersection<T>(validations, message);
  }
}
