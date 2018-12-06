import * as assert from "power-assert";
import { combine, tester } from "../core";
import { emailValidator } from "../examples/email";
import { maxLength, minLength } from "../main";
import shape from "../schema";

describe("schema", () => {
  test("no error", () => {
    const validator = shape({
      value: tester(() => false, () => "test")
    });
    assert.deepStrictEqual(validator({ value: true }), {
      value: { error: true, message: "test" }
    });
  });

  test("nested case", () => {
    const validator = shape({
      children: shape({
        childValue: tester(() => false, () => "test")
      }),
      value: tester(() => false, () => "test")
    });
    assert.deepStrictEqual(
      validator({
        value: true
      }),
      {
        children: {
          childValue: { error: true, message: "test" }
        },
        value: { error: true, message: "test" }
      }
    );
  });

  test("multiple row", () => {
    const validator = shape({
      bar: tester(() => true, () => "bar"),
      foo: tester(() => false, () => "foo")
    });
    assert.deepStrictEqual(validator({ foo: true, bar: true }), {
      bar: { error: false, message: "" },
      foo: { error: true, message: "foo" }
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
