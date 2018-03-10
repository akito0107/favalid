import { Messager, tester, Validator } from "../core";

export const min: (limit: number, messager: Messager) => Validator = (
  limit: number,
  messager: Messager
) => {
  return tester((v: number) => {
    return v < limit;
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

export const lessThan: (max: number, messager: Messager) => Validator = (
  limit,
  messager
) => {
  return tester((v: number) => {
    return v <= limit;
  }, messager);
};

export const moreThan: (min: number, messager: Messager) => Validator = (
  limit,
  messager
) => {
  return tester((v: number) => {
    return v >= limit;
  }, messager);
};

export const integer: (messager: Messager) => Validator = messager => {
  return tester((v: number) => {
    return Number.isInteger(v);
  }, messager);
};

export const positive: (messager: Messager) => Validator = messager => {
  return tester((v: number) => {
    return v > 0;
  }, messager);
};

export const negative: (messager: Messager) => Validator = messager => {
  return tester((v: number) => {
    return v < 0;
  }, messager);
};
