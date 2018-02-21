import * as assert from "power-assert";
import { maxLength, minLength, regexp } from "../strings";

describe("strings", () => {
  test("minLength", () => {
    const messager = () => "";
    const result = minLength("aaa", 2, messager)();
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });
  test("minLength:fail", () => {
    const messager = () => "error";
    const result = minLength("aaa", 5, messager)();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });

  test("maxLength", () => {
    const messager = () => "";
    const result = maxLength("aaabb", 10, messager)();
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });
  test("maxLength:fail", () => {
    const messager = () => "error";
    const result = maxLength("aaa", 2, messager)();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });

  test("regexp", () => {
    const messger = () => "";
    const result = regexp("abcdef", /abcdef/, messger, {})();
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });

  test("regexp:fail", () => {
    const messger = () => "error";
    const result = regexp("asdef", /abcdef/, messger, {})();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });

  test("regexp:exclude", () => {
    const messager = () => "";
    const result = regexp("全角カタカナのみ", /[ｦ-ﾟ]/, messager, {
      exclude: true
    })();
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });

  test("regexp:exclude:fail", () => {
    const messager = () => "error";
    const result = regexp("半角ｶﾀｶﾅまざってる", /[ｦ-ﾟ]/, messager, {
      exclude: true
    })();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });
});
