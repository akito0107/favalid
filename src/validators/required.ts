import { trim } from "ramda";
import { Messager, tester, Validator } from "../core";
import { isBlank, isString } from "../util";

export default (messager: Messager): Validator => {
  return tester(v => {
    if (isString(v)) {
      v = trim(v);
    }
    return !isBlank(v);
  }, messager);
};
