import * as assert from "power-assert";
import { required } from "../index";

describe("required", () => {
  test("strings", () => {
    const messager = () => "error";
    const result = required("str", messager)();
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });
  test("number", () => {
    const messager = () => "error";
    const result = required(123, messager)();
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });
  test("blank strings", () => {
    const messager = () => "error";
    const result = required("", messager)();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });
  test("white space strings", () => {
    const messager = () => "error";
    const result = required(" ", messager)();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });
  test("null value", () => {
    const messager = () => "error";
    const result = required(null, messager)();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });
  test("undefined value", () => {
    const messager = () => "error";
    const result = required(void 0, messager)();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });
});
