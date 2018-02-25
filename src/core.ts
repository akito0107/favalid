export type Test = () => boolean;
export type AsyncTest = () => Promise<boolean>;
export type Validator = () => IValidationError;
export type AsyncValidator = () => Promise<IValidationError>;
export type Messager = (v?: string) => string;
export type Tester = (t: Test, m: Messager) => Validator;
export type AsyncTester = (t: AsyncTest, m: Messager) => AsyncValidator;
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

export const defaultReducer: ErrorReducer = (m, e) => {
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

export const asyncTester: AsyncTester = (fn, messager) => async () => {
  try {
    const valid = await fn();
    if (valid) {
      return { error: false, message: "" };
    }
    return { error: true, message: messager() };
  } catch (e) {
    return { error: true, message: messager() };
  }
};

export const asyncExecWithReducer: (
  reducer: ErrorReducer,
  ...t: AsyncValidator[]
) => Promise<IValidationError> = async (reducer, ...t) => {
  const validators = t.map(test => test());
  const results = await Promise.all(validators);
  return results.reduce(
    (m, error) => {
      return reducer(m, error);
    },
    { error: false, message: "" }
  );
};

export const asyncExec: (
  ...t: AsyncValidator[]
) => Promise<IValidationError> = (...tests: AsyncValidator[]) => {
  return asyncExecWithReducer(defaultReducer, ...tests);
};

export const toAsync: (t: Validator) => AsyncValidator = t => async () => {
  return Promise.resolve(t());
};
