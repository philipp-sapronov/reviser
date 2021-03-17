export class TypeUtils {
  static isNumber(value: unknown): value is number {
    return typeof value === "number";
  }

  static isString(value: unknown): value is string {
    return typeof value === "string";
  }

  static isBoolean(value: unknown): value is boolean {
    return value === true || value === false;
  }

  static isNullOrUndefined(value: unknown): value is null | undefined {
    return value === null || value === undefined;
  }

  static isFile(value: unknown): value is File {
    return value instanceof File;
  }
}
