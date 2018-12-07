import { default as conditional } from "./conditional";
import { Messager, SchemaValidationResult, SchemaValidator } from "./core";
import required from "./validators/required";

export const shape = <T extends object>(obj: T): SchemaValidator<T> => {
  return (o: object) => {
    return Object.keys(obj).reduce((prev, k) => {
      const validator = obj[k];
      if (validator) {
        prev[k] = validator(o[k]);
      }
      return prev;
    }, {}) as SchemaValidationResult<T>;
  };
};

const defaultBlankErrorMessager = () => "blank";

export const safeShape = <T extends object>(
  obj: T,
  requiredMessager: Messager = defaultBlankErrorMessager
): SchemaValidator<T> => {
  return conditional(required(requiredMessager), shape(obj)) as SchemaValidator<
    T
  >;
};
