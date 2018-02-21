export type Test = () => boolean;
export type Validator = () => IValidationError;
export type Messager = (v?: string) => string;
export type Tester = (t: Test, m: Messager) => Validator;
export type ErrorReducer = (
  p: IValidationError,
  e: IValidationError
) => IValidationError;
export interface IValidationError {
  error: boolean;
  message: string;
}

export const tester: Tester = (test, messager) => () => {
  if (!test()) {
    return { error: true, message: messager() };
  }
  return { error: false, message: "" };
};

export const execWithReducer: (
  r: ErrorReducer,
  ...t: Validator[]
) => IValidationError = (reducer: ErrorReducer, ...tests: Validator[]) => {
  return tests.reduce(
    (m, test) => {
      return reducer(m, test());
    },
    { error: false, message: "" }
  );
};

const defaultReducer: ErrorReducer = (m, e) => {
  if (m.error) {
    return m;
  }
  return e;
};
export const exec: (...t: Validator[]) => IValidationError = (
  ...tests: Validator[]
) => {
  return execWithReducer(defaultReducer, ...tests);
};
