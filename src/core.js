// @flow

export type Test = (...v: any[]) => boolean;
export type AsyncTest = (...v: any[]) => Promise<boolean>;
export type Validator = (...v: any[]) => ValidationResult;
export type AsyncValidator = (...v: any[]) => Promise<ValidationResult>;
export type Messager = (v?: any) => string;
export type Tester = (t: Test, m: Messager) => Validator;
export type AsyncTester = (t: AsyncTest, m: Messager) => AsyncValidator;
export type ResultReducer = (p: any, e: ValidationResult) => any;

export interface ValidationResult {
  error: boolean;
  message: any;
}

export const tester: Tester = (test, messager) => (...args) => {
  if (!test(...args)) {
    return { error: true, message: messager() };
  }
  return { error: false, message: "" };
};

export const combineWithReducer: (
  r: ResultReducer,
  i: any,
  ...t: Validator[]
) => (...as: any[]) => ValidationResult = (
  reducer,
  initialValue = { error: false, message: "" },
  ...validators
) => (...args) => {
  return validators.reduce((m, validator) => {
    return reducer(m, validator(...args));
  }, initialValue);
};

export const defaultReducer: ResultReducer = (m, e) => {
  if (m.error) {
    return m;
  }
  return e;
};

export const combine: (
  ...t: Validator[]
) => (...args: any[]) => ValidationResult = (...tests: Validator[]) => (
  ...args: any[]
) => {
  return combineWithReducer(
    defaultReducer,
    { error: false, message: "" },
    ...tests
  )(...args);
};

export const asyncTester: AsyncTester = (fn, messager) => async (...args) => {
  try {
    const valid = await fn(...args);
    if (valid) {
      return { error: false, message: "" };
    }
    return { error: true, message: messager() };
  } catch (e) {
    return { error: true, message: messager(e) };
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

export const toAsync: (t: Validator) => AsyncValidator = t => async (
  ...arg
) => {
  return Promise.resolve(t(...arg));
};
