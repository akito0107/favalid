import { Messager, tester, Validator } from "../core";
import { strlen } from "../util";

export default (limit: number, messager: Messager): Validator => {
  return tester((target: string) => {
    return strlen(target) >= limit;
  }, messager);
};
