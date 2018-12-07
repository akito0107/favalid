import { Messager, tester, ValueValidator } from "../core";

export default (limit: number, messager: Messager): ValueValidator => {
  return tester((v: number) => {
    return v < limit;
  }, messager);
};
