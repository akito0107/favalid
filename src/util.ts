import { isEmpty, isNil } from "ramda";

export const strlen = (str: string) => [...str].length;

export const isBlank = (s: any) => {
  return isNil(s) || isEmpty(s);
};

export const isString = (str: string) => typeof str === "string";
