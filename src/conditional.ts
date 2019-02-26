import { Validator } from "./core";
import { hasError } from "./util";

export default (requirements: Validator, main: Validator): Validator => {
  return <T>(...args: T[]) => {
    const precondition = requirements(...args);
    if (hasError(precondition)) {
      return {
        ...precondition,
        preconditionCheckFailed: true
      };
    }

    return main(...args);
  };
};
