import * as assert from "power-assert";
import { maxLength, minLength, regexp } from "../strings";

function helper(tester, arg, expect) {
  assert.deepStrictEqual(tester(arg), expect);
}

describe("strings", () => {
  test("minLength", () => {
    helper(minLength(2, () => ""), "aaa", {
      error: false,
      message: ""
    });
  });
  test("minLength:fail", () => {
    helper(minLength(5, () => "error"), "aaa", {
      error: true,
      message: "error"
    });
  });
  test("maxLength", () => {
    helper(maxLength(10, () => ""), "aaabb", {
      error: false,
      message: ""
    });
  });
  test("maxLength:fail", () => {
    helper(maxLength(2, () => "error"), "aaa", {
      error: true,
      message: "error"
    });
  });
  test("regexp", () => {
    helper(regexp(/abcdef/, () => "", {}), "abcdef", {
      error: false,
      message: ""
    });
  });
  test("regexp:fail", () => {
    helper(regexp(/abcdef/, () => "error", {}), "asdef", {
      error: true,
      message: "error"
    });
  });
  test("regexp:exclude", () => {
    helper(
      regexp(/[ｦ-ﾟ]/, () => "", {
        exclude: true
      }),
      "全角カタカナのみ",
      {
        error: false,
        message: ""
      }
    );
  });
  test("regexp:exclude:fail", () => {
    helper(
      regexp(/[ｦ-ﾟ]/, () => "error", {
        exclude: true
      }),
      "半角ｶﾀｶﾅまざってる",
      {
        error: true,
        message: "error"
      }
    );
  });
});
