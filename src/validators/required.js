// @flow

import { isString, trim } from "lodash-es";
import { isBlank } from "../util";
import { tester } from "../core";
import type { Messager, Validator } from "../core";

export default (messager: Messager): Validator => {
  return tester(v => {
    if (isString(v)) {
      v = trim(v);
    }
    return !isBlank(v);
  }, messager);
};
