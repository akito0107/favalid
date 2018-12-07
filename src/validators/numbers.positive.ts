import { Messager, tester, ValueValidator } from "../core";

export default (messager: Messager): ValueValidator => {
  return tester((v: number) => {
    return v > 0;
  }, messager);
};
