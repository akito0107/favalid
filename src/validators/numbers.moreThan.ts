import { Messager, tester, Validator } from "../core";

export default (min: number, messager: Messager): Validator => {
  return tester((v: number) => {
    return v >= min;
  }, messager);
};
