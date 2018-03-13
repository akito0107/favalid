// @flow

import { tester } from "../core";
import type { Messager, Validator } from "../core";

export default (min: number, messager: Messager): Validator => {
  return tester((v: number) => {
    return v >= min;
  }, messager);
};
