export type TSchema<T extends object> = {
  [K in keyof T]: IValidation<T>;
};

export type Message = string | undefined;

export type THandler<T extends object> = (value: T[keyof T], data: T) => boolean;

export interface IValidator<T extends object> {
  message: Message;
  validate: THandler<T>;
}

export interface IValidation<T extends object> {
  readonly message: Message;
  readonly isValidation: true;
  readonly isNullable: IValidation<T>;
  validate: THandler<T>;
}
