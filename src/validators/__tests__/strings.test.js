// @flow

import maxLength from "../strings.maxLength";
import minLength from "../strings.minLength";
import regexp from "../strings.regexp";
import { helper } from "./helper";

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
