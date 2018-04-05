// @flow

import assert from "power-assert";
import { combine, tester } from "../core";
import shape from "../schema";
import { emailValidator } from "../examples/email";
import { maxLength, minLength } from "../main";

describe("schema", () => {
  test("no error", () => {
    const validator = shape({
      value: tester(() => false, () => "test")
    });
    assert.deepStrictEqual(validator({ value: true }), {
      value: { error: true, message: "test" }
    });
  });
  test("multiple row", () => {
    const validator = shape({
      foo: tester(() => false, () => "foo"),
      bar: tester(() => true, () => "bar")
    });
    assert.deepStrictEqual(validator({ foo: true, bar: true }), {
      foo: { error: true, message: "foo" },
      bar: { error: false, message: "" }
    });
  });
  test("combined validator", () => {
    const validator = shape({
      email: emailValidator,
      password: combine(
        minLength(10, () => "at least 10 letters."),
        maxLength(16, () => "maximum: 16 letters.")
      )
    });

    [
      {
        in: { email: "test@test.com", password: "12345678910" },
        out: {
          email: { error: false, message: "" },
          password: { error: false, message: "" }
        }
      },
      {
        in: { email: "testtest.com", password: "178910" },
        out: {
          email: { error: true, message: "invalid email." },
          password: { error: true, message: "at least 10 letters." }
        }
      },
      {
        in: {
          email: "testtest.com",
          password: "178910",
          unknownprop: "unknown"
        },
        out: {
          email: { error: true, message: "invalid email." },
          password: { error: true, message: "at least 10 letters." }
        }
      }
    ].forEach(c => {
      assert.deepStrictEqual(validator(c.in), c.out);
    });
  });
});
