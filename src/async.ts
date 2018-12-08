import {
  AsyncTester,
  AsyncValidator,
  defaultReducer,
  ResultReducer,
  ValidationResult,
  ValueValidator
} from "./core";

export const asyncTester: AsyncTester = (fn, messager) => async (...args) => {
  try {
    const valid = await fn(...args);
    if (valid) {
      return { error: false, message: "" };
    }
    return { error: true, message: messager(...args) };
  } catch (e) {
    return { error: true, message: messager(e, ...args) };
  }
};

export const asyncCombineWithReducer: (
  reducer: ResultReducer,
  i: any,
  ...t: AsyncValidator[]
) => (...a: any[]) => Promise<ValidationResult> = (
  reducer,
  initialValue = { error: false, message: "" },
  ...testers
) => async (...args) => {
  const asyncValidators = testers.map(test => test(...args));
  const results = await Promise.all(asyncValidators);
  return results.reduce((m, error) => {
    return reducer(m, error);
  }, initialValue);
};

export const asyncCombine: (
  ...t: AsyncValidator[]
) => (...a: any[]) => Promise<ValidationResult> = (
  ...tests: AsyncValidator[]
) => (...args) => {
  return asyncCombineWithReducer(
    defaultReducer,
    { error: false, message: "" },
    ...tests
  )(...args);
};

export const toAsync: (t: ValueValidator) => AsyncValidator = t => async (
  ...arg
) => {
  return Promise.resolve(t(...arg));
};
