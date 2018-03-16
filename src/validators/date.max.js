// @flow

import { tester } from "../core";
import type { Messager, Validator } from "../core";

export default (date: Date, messager: Messager): Validator => {
  return tester((v: Date) => {
    return date > v;
  }, messager);
};
