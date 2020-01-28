import * as assert from "power-assert";
import { combine, tester } from "../core";
import { conditional, maxLength, minLength, required } from "../main";
import { isString } from "../util";

describe("conditional", () => {
  test("stop early", () => {
    const prerequiments = tester(
      () => false,
      () => "stop"
    );
    const dummy = tester(
      () => {
        assert.fail("unreachable");
        return false;
      },
      () => ""
    );
    assert.deepStrictEqual(conditional(prerequiments, dummy)(""), {
      error: true,
      message: "stop",
      preconditionCheckFailed: true
    });
  });
  test("pass requirements", () => {
    const prerequiments = tester(
      () => true,
      () => ""
    );
    const dummy = tester(
      () => {
        return true;
      },
      () => "validate fail"
    );
    assert.deepStrictEqual(conditional(prerequiments, dummy)(""), {
      error: false,
      message: ""
    });
  });
  test("combine and conditional", () => {
    const precondition = combine(
      required(() => "required"),
      tester(
        str => isString(str),
        () => "must be string"
      )
    );
    const validator = combine(
      minLength(5, () => "min 5 length"),
      maxLength(10, () => "max 10 length")
    );
    const conditionalCheckedValidator = conditional(precondition, validator);

    [
      {
        in: null,
        except: {
          error: true,
          message: "required",
          preconditionCheckFailed: true
        }
      },
      {
        in: 123,
        except: {
          error: true,
          message: "must be string",
          preconditionCheckFailed: true
        }
      },
      { in: "1234", except: { error: true, message: "min 5 length" } },
      { in: "12345678910", except: { error: true, message: "max 10 length" } },
      { in: "123456789", except: { error: false, message: "" } }
    ].forEach(c => {
      assert.deepStrictEqual(conditionalCheckedValidator(c.in), c.except);
    });
  });
});
