// @flow

import isEmpty from "lodash.isempty";
import isNaN from "lodash.isnan";
import isNumber from "lodash.isnumber";

export const strlen = (str: string) => [...str].length;

export const isBlank = (s: any) => {
  return (isEmpty(s) && !isNumber(s)) || isNaN(s);
};
