// @flow

import { tester } from "../core";
import type { Messager, Validator } from "../core";
import { strlen } from "../util";

export default (limit: number, messager: Messager): Validator => {
  return tester((target: string) => {
    return strlen(target) > limit;
  }, messager);
};
