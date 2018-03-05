import * as _ from "lodash";
import { Messager, tester, Validator } from "../core";
import { isBlank } from "../util";

export { min, max } from "./numbers";
export { minLength, maxLength, regexp } from "./strings";

export const required: (messager: Messager) => Validator = messager => {
  return tester(v => {
    if (_.isString(v)) {
      v = _.trim(v);
    }
    return !isBlank(v);
  }, messager);
};
