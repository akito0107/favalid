// @flow

import { isEmpty, isNaN, isNumber } from "lodash-es";

export const strlen = (str: string) => [...str].length;

export const isBlank = (s: any) => {
  return (isEmpty(s) && !isNumber(s)) || isNaN(s);
};
