import * as isString from "lodash.isstring";
import * as trim from "lodash.trim";
import { Messager, tester, Validator } from "../core";
import { isBlank } from "../util";

export { min, max } from "./numbers";
export { minLength, maxLength, regexp } from "./strings";

export const required: (messager: Messager) => Validator = messager => {
  return tester(v => {
    if (isString(v)) {
      v = trim(v);
    }
    return !isBlank(v);
  }, messager);
};
