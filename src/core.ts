export type Test = (...v: any[]) => boolean;
export type AsyncTest = (...v: any[]) => Promise<boolean>;

export type SchemaValidator<T extends object> = (
  v?: any
) => SchemaValidationResult<T>;
export type ValueValidator = (...v: any[]) => ValidationResult;
export type Validator = ValueValidator | SchemaValidator<object>;
export type AsyncValidator = (...v: any[]) => Promise<ValidationResult>;
export type Messager = (v?: any, a?: any[]) => string;
export type Tester = (t: Test, m: Messager) => ValueValidator;
export type AsyncTester = (t: AsyncTest, m: Messager) => AsyncValidator;
export type ResultReducer = (p: any, e: ValidationResult) => any;

export type SchemaValidationResult<T extends object> = {
  [P in keyof T]: T[P] extends object
    ? SchemaValidationResult<T[P]>
    : ValidationResult
};

export type ValidationResult = {
  error: boolean;
  message: any;
};

export const tester: Tester = (test, messager) => (...args) => {
  if (!test(...args)) {
    return { error: true, message: messager(...args) };
  }
  return { error: false, message: "" };
};

export const combineWithReducer: (
  t: ValueValidator[],
  r: ResultReducer,
  i: any
) => (...as: any[]) => ValidationResult = (
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
  ...t: ValueValidator[]
) => (...args: any[]) => ValidationResult = (...tests: ValueValidator[]) => (
  ...args: any[]
) => {
  return combineWithReducer(tests, defaultReducer, {
    error: false,
    message: ""
  })(...args);
};
