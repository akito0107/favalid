// @flow

import assert from "power-assert";
import { asyncValidator, asyncValidatorWithReason } from "../async";

describe("async", () => {
  test("valid case", async () => {
    const target = "example@hello.com";
    const res = await asyncValidator(target);
    assert.deepStrictEqual(res, {
      error: false,
      message: ""
    });
  });
  test("invalid case", async () => {
    const target = "invalid@hello.com";
    const res = await asyncValidator(target);
    assert.deepStrictEqual(res, {
      error: true,
      message: "api check failed"
    });
  });
});

describe("asyncWithReason", () => {
  test("invalid case", async () => {
    const target = "invalid@hello.com";
    const res = await asyncValidatorWithReason(target);
    assert.deepStrictEqual(res, {
      error: true,
      message: "api check failed with reason: user not exists"
    });
  });
});
