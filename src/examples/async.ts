import { asyncExec, asyncTester, toAsync } from "../core";
import { minLength } from "../validators";

const USERDB = {
  "example@hello.com": true
};

const apiRequest = t => async () => {
  if (USERDB[t]) {
    return Promise.resolve(true);
  }
  return Promise.reject(new Error("user not exists"));
};

export const asyncValidator = async target => {
  return asyncExec(
    toAsync(minLength(target, 10, () => "at least 10 letters.")),
    asyncTester(apiRequest(target), () => "api check failed")
  );
};

export const asyncValidatorWithReason = async target => {
  return asyncExec(
    toAsync(minLength(target, 10, () => "at least 10 letters.")),
    asyncTester(
      apiRequest(target),
      e => `api check failed with reason: ${e.message}`
    )
  );
};
