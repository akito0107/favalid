import { Messager, tester, ValueValidator } from "../core";
import { isBlank, isString } from "../util";

export default (messager: Messager): ValueValidator => {
  return tester(v => {
    if (isString(v)) {
      v = v.trim();
    }
    return !isBlank(v);
  }, messager);
};
