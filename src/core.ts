export type Test = () => boolean;
export type AsyncTest = () => Promise<boolean>;
export type Validator = () => IValidationResult;
export type AsyncValidator = () => Promise<IValidationResult>;
export type Messager = (v?: any) => string;
export type Tester = (t: Test, m: Messager) => Validator;
export type AsyncTester = (t: AsyncTest, m: Messager) => AsyncValidator;
export type ResultReducer = (
  p: IValidationResult,
  e: IValidationResult
) => IValidationResult;
export interface IValidationResult {
  error: boolean;
  message: any;
}

export const tester: Tester = (test, messager) => () => {
  if (!test()) {
    return { error: true, message: messager() };
  }
  return { error: false, message: "" };
};

export const execWithReducer: (
  r: ResultReducer,
  ...t: Validator[]
) => IValidationResult = (reducer: ResultReducer, ...tests: Validator[]) => {
  return tests.reduce(
    (m, test) => {
      return reducer(m, test());
    },
    { error: false, message: "" }
  );
};

export const defaultReducer: ResultReducer = (m, e) => {
  if (m.error) {
    return m;
  }
  return e;
};

export const exec: (...t: Validator[]) => IValidationResult = (
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
    return { error: true, message: messager(e) };
  }
};

export const asyncExecWithReducer: (
  reducer: ResultReducer,
  ...t: AsyncValidator[]
) => Promise<IValidationResult> = async (reducer, ...t) => {
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
) => Promise<IValidationResult> = (...tests: AsyncValidator[]) => {
  return asyncExecWithReducer(defaultReducer, ...tests);
};

export const toAsync: (t: Validator) => AsyncValidator = t => async () => {
  return Promise.resolve(t());
};
