import * as _ from "lodash";
import { Messager, tester, Validator } from "../core";
import { strlen } from "../util";

export const minLength: (
  target: string,
  limit: number,
  messager: Messager
) => Validator = (target: string, limit: number, messager: Messager) => {
  return tester(() => {
    return strlen(target) > limit;
  }, messager);
};

export const maxLength: (
  target: string,
  limit: number,
  messager: Messager
) => Validator = (target: string, limit: number, messager: Messager) => {
  return tester(() => {
    return strlen(target) < limit;
  }, messager);
};

export interface IRegExpOption {
  exclude?: boolean;
}

export const regexp: (
  target: string,
  regex: RegExp,
  messger: Messager,
  opts: IRegExpOption
) => Validator = (target, regex, messager, { exclude = false }) => {
  if (exclude) {
    return tester(() => !regex.test(target), messager);
  } else {
    return tester(() => regex.test(target), messager);
  }
};
