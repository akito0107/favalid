import { Messager, tester, ValueValidator } from "../core";

export default (date: Date, messager: Messager): ValueValidator => {
  return tester((v: Date) => {
    return date > v;
  }, messager);
};
