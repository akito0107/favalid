import { Messager, tester, Validator } from "../core";

export default (messager: Messager): Validator => {
  return tester((v: number) => {
    return v < 0;
  }, messager);
};
