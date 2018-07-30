import {
  AsyncTester,
  AsyncValidator,
  defaultReducer,
  IValidationResult,
  ResultReducer,
  Validator
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
) => (...a: any[]) => Promise<IValidationResult> = (
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
) => (...a: any[]) => Promise<IValidationResult> = (
  ...tests: AsyncValidator[]
) => (...args) => {
  return asyncCombineWithReducer(
    defaultReducer,
    { error: false, message: "" },
    ...tests
  )(...args);
};

export const toAsync: (t: Validator) => AsyncValidator = t => async (
  ...arg
) => {
  return Promise.resolve(t(...arg));
};
