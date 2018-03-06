import { Messager, tester, Validator } from "../core";
import { strlen } from "../util";

export const minLength: (limit: number, messager: Messager) => Validator = (
  limit: number,
  messager: Messager
) => {
  return tester((target: string) => {
    return strlen(target) > limit;
  }, messager);
};

export const maxLength: (limit: number, messager: Messager) => Validator = (
  limit: number,
  messager: Messager
) => {
  return tester((target: string) => {
    return strlen(target) < limit;
  }, messager);
};

export interface IRegExpOption {
  exclude?: boolean;
}

export const regexp: (
  regex: RegExp,
  messger: Messager,
  opts: IRegExpOption
) => Validator = (regex, messager, { exclude = false }) => {
  if (exclude) {
    return tester((target: string) => !regex.test(target), messager);
  } else {
    return tester((target: string) => regex.test(target), messager);
  }
};
