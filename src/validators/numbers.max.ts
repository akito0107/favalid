import { Messager, tester, Validator } from "../core";

export default (limit: number, messager: Messager): Validator => {
  return tester((v: number) => {
    return v > limit;
  }, messager);
};
