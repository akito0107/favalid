import { Messager, tester, ValueValidator } from "../core";
import { strlen } from "../util";

export default (limit: number, messager: Messager): ValueValidator => {
  return tester((target: string) => {
    return strlen(target) < limit;
  }, messager);
};
