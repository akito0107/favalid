import { Validator } from "./core";

export default (requirements: Validator, main: Validator): Validator => {
  return (...args) => {
    const precondition = requirements(...args);
    if (precondition.error) {
      return precondition;
    }
    return main(...args);
  };
};
