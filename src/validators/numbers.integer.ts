import { Messager, tester, Validator } from "../core";

export default (messager: Messager): Validator => {
  return tester((v: number) => {
    return Number.isInteger(v);
  }, messager);
};
