import { SchemaValidationResult, ValidationResult } from "./core";

const isNil = (arg: any): boolean => arg === null || arg === undefined;

const isEmpty = (arg: any): boolean => {
  switch (typeof arg) {
    case "string":
      return arg === "";
    case "object":
      // refs: https://github.com/ramda/ramda/blob/f494250c0a/source/isEmpty.js#L20-L25
      if (arg === null) {
        return false;
      }
      if (Array.isArray(arg)) {
        return arg.length === 0;
      }
      return arg.constructor === Object && Object.keys(arg).length === 0;
    default:
      return false;
  }
};

export const strlen = (str: string) => [...str].length;

export const isBlank = (s: any) => {
  return isNil(s) || isEmpty(s);
};

export const isString = (str: string) => typeof str === "string";

export const hasError = <T>(
  res: T extends object ? SchemaValidationResult<T> : ValidationResult
): boolean => {
  const result: any = res;
  if (result.hasOwnProperty("error")) {
    return result.error;
  }
  const schemaResult: SchemaValidationResult<object> = res;

  return Object.keys(schemaResult).reduce((p, k) => {
    return p || hasError(schemaResult[k]);
  }, false);
};
