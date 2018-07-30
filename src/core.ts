export type Test = (...v: any[]) => boolean;
export type AsyncTest = (...v: any[]) => Promise<boolean>;
export type Validator = (...v: any[]) => IValidationResult;
export type AsyncValidator = (...v: any[]) => Promise<IValidationResult>;
export type Messager = (v?: any, a?: any[]) => string;
export type Tester = (t: Test, m: Messager) => Validator;
export type AsyncTester = (t: AsyncTest, m: Messager) => AsyncValidator;
export type ResultReducer = (p: any, e: IValidationResult) => any;

export interface IValidationResult {
  error: boolean;
  message: any;
}

export const tester: Tester = (test, messager) => (...args) => {
  if (!test(...args)) {
    return { error: true, message: messager(...args) };
  }
  return { error: false, message: "" };
};

export const combineWithReducer: (
  t: Validator[],
  r: ResultReducer,
  i: any
) => (...as: any[]) => IValidationResult = (
  validators,
  reducer,
  initialValue = { error: false, message: "" }
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
) => (...args: any[]) => IValidationResult = (...tests: Validator[]) => (
  ...args: any[]
) => {
  return combineWithReducer(tests, defaultReducer, {
    error: false,
    message: ""
  })(...args);
};
