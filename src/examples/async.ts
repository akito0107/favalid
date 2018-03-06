import { asyncExec, asyncTester, toAsync } from "../core";
import { minLength } from "../validators/strings";

const USERDB = {
  "example@hello.com": true
};

const apiRequest = async t => {
  if (USERDB[t]) {
    return Promise.resolve(true);
  }
  return Promise.reject(new Error("user not exists"));
};

export const asyncValidator = async target => {
  return asyncExec(
    toAsync(minLength(10, () => "at least 10 letters.")),
    asyncTester(apiRequest, () => "api check failed")
  )(target);
};

export const asyncValidatorWithReason = async target => {
  return asyncExec(
    toAsync(minLength(10, () => "at least 10 letters.")),
    asyncTester(apiRequest, e => `api check failed with reason: ${e.message}`)
  )(target);
};
