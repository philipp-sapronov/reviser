type ArrayOfKeys<T extends object> = [...(keyof T)[]];

export function keys<T extends object>(obj: T): ArrayOfKeys<T> {
  return Object.keys(obj) as ArrayOfKeys<T>;
}
