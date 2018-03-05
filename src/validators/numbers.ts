import { Messager, tester, Validator } from "../core";

export const min: (limit: number, messager: Messager) => Validator = (
  limit: number,
  messager: Messager
) => {
  return tester((v: number) => {
    return v <= limit;
  }, messager);
};

export const max: (limit: number, messager: Messager) => Validator = (
  limit: number,
  messager: Messager
) => {
  return tester((v: number) => {
    return v > limit;
  }, messager);
};
