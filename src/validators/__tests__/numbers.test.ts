import * as assert from "power-assert";
import { max, min } from "../numbers";

describe("number validator", () => {
  test("min", () => {
    const messager = () => "error";
    const result = min(1, 2, messager)();
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });

  test("min:fail", () => {
    const messager = () => "error";
    const result = min(2, 1, messager)();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });

  test("max", () => {
    const messager = () => "error";
    const result = max(2, 1, messager)();
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });

  test("max:fail", () => {
    const messager = () => "error";
    const result = max(2, 3, messager)();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });
});
