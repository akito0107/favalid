import { Messager, tester, Validator } from "../core";

export const min: (
  target: number,
  limit: number,
  messager: Messager
) => Validator = (v: number, limit: number, messager: Messager) => {
  return tester(() => {
    return v <= limit;
  }, messager);
};

export const max: (
  target: number,
  limit: number,
  messager: Messager
) => Validator = (v: number, limit: number, messager: Messager) => {
  return tester(() => {
    return v > limit;
  }, messager);
};
