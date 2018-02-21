import assert from "power-assert";
import {
  ErrorReducer,
  exec,
  execWithReducer,
  Messager,
  Test,
  tester
} from "../core";

describe("tester", () => {
  test("no error", () => {
    const test: Test = () => true;
    const message: Messager = () => "";
    const result = tester(test, message)();
    assert.deepStrictEqual(result, {
      error: false,
      message: ""
    });
  });
  test("has error", () => {
    const test = () => false;
    const message = () => "error";
    const result = tester(test, message)();
    assert.deepStrictEqual(result, {
      error: true,
      message: "error"
    });
  });
});

describe("execWithReducer", () => {
  test("exec multiple tests", () => {
    let called = 0;
    const testerMaker = () =>
      tester(() => {
        called++;
        return true;
      }, () => "");
    const reducer: ErrorReducer = (m, e) => {
      if (m.error) {
        return m;
      }
      return e;
    };
    execWithReducer(reducer, testerMaker(), testerMaker());
    assert.strictEqual(2, called);
  });
});

describe("exec", () => {
  test("should return first validate failure", () => {
    const tester1 = tester(() => true, () => "test1");
    const tester2 = tester(() => false, () => "test2");
    const tester3 = tester(() => true, () => "test3");
    const e = exec(tester1, tester2, tester3);

    assert.deepStrictEqual(e, {
      error: true,
      message: "test2"
    });
  });
});
