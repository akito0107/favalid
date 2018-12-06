import { Messager, tester, Validator } from "../core";
import { isBlank, isString } from "../util";

export default (messager: Messager): Validator => {
  return tester(v => {
    if (isString(v)) {
      v = v.trim();
    }
    return !isBlank(v);
  }, messager);
};
