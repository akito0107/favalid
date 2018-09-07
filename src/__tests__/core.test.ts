import * as assert from "power-assert";
import { combine, combineWithReducer, ResultReducer, tester } from "../core";
import { helper } from "../validators/__tests__/helper";

describe("tester", () => {
  test("no error", () => {
    helper(tester(() => true, () => ""), null, {
      error: false,
      message: ""
    });
  });
  test("has error", () => {
    helper(tester(() => false, () => "error"), null, {
      error: true,
      message: "error"
    });
  });
});

describe("combineWithReducer", () => {
  test("combine multiple tests", () => {
    let called = 0;
    const testerMaker = () =>
      tester(
        () => {
          called++;
          return true;
        },
        () => ""
      );
    const reducer: ResultReducer = (m, e) => {
      if (m.error) {
        return m;
      }
      return e;
    };
    combineWithReducer([testerMaker(), testerMaker()], reducer, {
      error: false,
      message: ""
    })();
    assert.strictEqual(2, called);
  });
});

describe("combine", () => {
  test("should return first validate failure", () => {
    const tester1 = tester(() => true, () => "test1");
    const tester2 = tester(() => false, () => "test2");
    const tester3 = tester(() => true, () => "test3");
    helper(combine(tester1, tester2, tester3), null, {
      error: true,
      message: "test2"
    });
  });
});

describe("messager can receive actual value", () => {
  const test = tester(() => false, value => String(value));
  helper(test, "test", {
    error: true,
    message: "test"
  });
});
