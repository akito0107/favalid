import * as assert from "power-assert";
import { max, min } from "../numbers";

describe("number validator", () => {
  test("min", () => {
    const messager = () => "error";
    const result = min(2, messager)(1);
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });

  test("min:fail", () => {
    const messager = () => "error";
    const result = min(1, messager)(2);
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });

  test("max", () => {
    const messager = () => "error";
    const result = max(1, messager)(2);
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });

  test("max:fail", () => {
    const messager = () => "error";
    const result = max(3, messager)(2);
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });
});
