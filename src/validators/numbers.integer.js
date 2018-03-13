// @flow

import { tester } from "../core";
import type { Messager, Validator } from "../core";

export default (messager: Messager): Validator => {
  return tester((v: number) => {
    return Number.isInteger(v);
  }, messager);
};
