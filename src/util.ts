import * as isEmpty from "lodash.isempty";
import * as isNaN from "lodash.isnan";
import * as isNumber from "lodash.isnumber";

export const strlen = (str: string) => [...str].length;

export const isBlank = s => {
  return (isEmpty(s) && !isNumber(s)) || isNaN(s);
};
