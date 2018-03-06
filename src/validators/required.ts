import { isString, trim } from "lodash-es";
import { Messager, tester, Validator } from "../core";
import { isBlank } from "../util";

export const required: (messager: Messager) => Validator = messager => {
  return tester(v => {
    if (isString(v)) {
      v = trim(v);
    }
    return !isBlank(v);
  }, messager);
};
