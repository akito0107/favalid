import * as _ from "lodash";
import { Messager, tester, Validator } from "../core";
import { isBlank } from "../util";

export { min, max } from "./numbers";
export { minLength, maxLength, regexp } from "./strings";

export const required: (v: any, messager: Messager) => Validator = (
  v,
  messager
) => {
  if (_.isString(v)) {
    v = _.trim(v);
  }
  return tester(() => {
    return !isBlank(v);
  }, messager);
};
