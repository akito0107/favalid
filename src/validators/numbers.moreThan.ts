import { Messager, tester, ValueValidator } from "../core";

export default (min: number, messager: Messager): ValueValidator => {
  return tester((v: number) => {
    return v >= min;
  }, messager);
};
