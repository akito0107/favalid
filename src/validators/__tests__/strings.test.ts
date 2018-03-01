import * as assert from "power-assert";
import { maxLength, minLength, regexp } from "../strings";

function helper(tester, expect) {
  assert.deepStrictEqual(tester(), expect);
}

describe("strings", () => {
  test("minLength", () => {
    helper(minLength("aaa", 2, () => ""), {
      error: false,
      message: ""
    });
  });
  test("minLength:fail", () => {
    helper(minLength("aaa", 5, () => "error"), {
      error: true,
      message: "error"
    });
  });
  test("maxLength", () => {
    helper(maxLength("aaabb", 10, () => ""), {
      error: false,
      message: ""
    });
  });
  test("maxLength:fail", () => {
    helper(maxLength("aaa", 2, () => "error"), {
      error: true,
      message: "error"
    });
  });
  test("regexp", () => {
    helper(regexp("abcdef", /abcdef/, () => "", {}), {
      error: false,
      message: ""
    });
  });
  test("regexp:fail", () => {
    helper(regexp("asdef", /abcdef/, () => "error", {}), {
      error: true,
      message: "error"
    });
  });
  test("regexp:exclude", () => {
    helper(
      regexp("全角カタカナのみ", /[ｦ-ﾟ]/, () => "", {
        exclude: true
      }),
      {
        error: false,
        message: ""
      }
    );
  });
  test("regexp:exclude:fail", () => {
    helper(
      regexp("半角ｶﾀｶﾅまざってる", /[ｦ-ﾟ]/, () => "error", {
        exclude: true
      }),
      {
        error: true,
        message: "error"
      }
    );
  });
});
