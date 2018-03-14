// @flow

import { tester } from "../core";
import type { Messager, Validator } from "../core";

export type RegExpOption = {
  exclude?: boolean
};

export default (
  regex: RegExp,
  messager: Messager,
  { exclude = false }: RegExpOption
): Validator => {
  if (exclude) {
    return tester((target: string) => !regex.test(target), messager);
  } else {
    return tester((target: string) => regex.test(target), messager);
  }
};
