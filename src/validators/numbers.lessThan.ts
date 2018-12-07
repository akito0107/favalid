import { Messager, tester, ValueValidator } from "../core";

export default (max: number, messager: Messager): ValueValidator => {
  return tester((v: number) => {
    return v <= max;
  }, messager);
};
