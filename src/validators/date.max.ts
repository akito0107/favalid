import { Messager, tester, Validator } from "../core";

export default (date: Date, messager: Messager): Validator => {
  return tester((v: Date) => {
    return date > v;
  }, messager);
};
