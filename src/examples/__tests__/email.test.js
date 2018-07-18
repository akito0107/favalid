// @flow

import { repeat } from "ramda";
import assert from "power-assert";
import {
  emailValidator,
  emailValidatorWithMultipleErrorReducer,
  emailValidatorWithReducer
} from "../email";

describe("email", () => {
  test("valid email", () => {
    const target = "valid@valid.com";
    assert.deepStrictEqual(emailValidator(target), {
      error: false,
      message: ""
    });
  });

  test("blank email", () => {
    const target = "";
    assert.deepStrictEqual(emailValidator(target), {
      error: true,
      message: "required."
    });
  });

  test("min", () => {
    const target = "asdf";
    assert.deepStrictEqual(emailValidator(target), {
      error: true,
      message: "at least 10 letters."
    });
  });

  test("max", () => {
    const target = repeat("a", 101).join();
    assert.deepStrictEqual(emailValidator(target), {
      error: true,
      message: "exceeds 100 letters."
    });
  });

  test("regexp", () => {
    const target = "aaabbbcccddd";
    assert.deepStrictEqual(emailValidator(target), {
      error: true,
      message: "invalid email."
    });
  });
});

describe("emailWithReducer", () => {
  test("valid email", () => {
    const target = "valid@valid.com";
    assert.deepStrictEqual(emailValidatorWithReducer(target), {
      error: false,
      message: ""
    });
  });

  test("min and invalid format", () => {
    const target = "aaa";
    assert.deepStrictEqual(emailValidatorWithReducer(target), {
      error: true,
      message: "at least 10 letters. / invalid email."
    });
  });
});

describe("emailWithMultipleErrorReducer", () => {
  test("valid email", () => {
    const target = "valid@valid.com";
    assert.deepStrictEqual(emailValidatorWithMultipleErrorReducer(target), []);
  });

  test("min and invalid format", () => {
    const target = "aaa";
    assert.deepStrictEqual(emailValidatorWithMultipleErrorReducer(target), [
      { error: true, message: "at least 10 letters." },
      { error: true, message: "invalid email." }
    ]);
  });
});
