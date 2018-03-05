import * as assert from "power-assert";
import {
  asyncExec,
  asyncExecWithReducer,
  asyncTester,
  defaultReducer,
  combine,
  combineWithReducer,
  Messager,
  ResultReducer,
  Test,
  Tester,
  tester,
  toAsync,
  Validator
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

describe("combineWithReducer", () => {
  test("combine multiple tests", () => {
    let called = 0;
    const testerMaker = () =>
      tester(() => {
        called++;
        return true;
      }, () => "");
    const reducer: ResultReducer = (m, e) => {
      if (m.error) {
        return m;
      }
      return e;
    };
    combineWithReducer(
      reducer,
      {
        error: false,
        message: ""
      },
      testerMaker(),
      testerMaker()
    )();
    assert.strictEqual(2, called);
  });
});

describe("combine", () => {
  test("should return first validate failure", () => {
    const tester1 = tester(() => true, () => "test1");
    const tester2 = tester(() => false, () => "test2");
    const tester3 = tester(() => true, () => "test3");
    const e = combine(tester1, tester2, tester3)();

    assert.deepStrictEqual(e, {
      error: true,
      message: "test2"
    });
  });
});

describe.skip("async", () => {
  test("basic", async () => {
    const validator = asyncTester(() => {
      return Promise.resolve(true);
    }, () => "");

    assert.deepStrictEqual(await validator(), {
      error: false,
      message: ""
    });
  });

  test("should be invalid", async () => {
    const validator = asyncTester(() => {
      return Promise.resolve(false);
    }, () => "error");

    assert.deepStrictEqual(await validator(), {
      error: true,
      message: "error"
    });
  });

  test("fail Promise.resolve", async () => {
    const validator = asyncTester(() => {
      return Promise.reject(new Error("message"));
    }, () => "error");

    assert.deepStrictEqual(await validator(), {
      error: true,
      message: "error"
    });
  });

  test("with async function", async () => {
    const validator = asyncTester(async () => {
      return true;
    }, () => "");

    assert.deepStrictEqual(await validator(), {
      error: false,
      message: ""
    });
  });
});

describe.skip("asyncExec (with Reducer)", () => {
  test("combine multiple asyncTesters", async () => {
    const tester1 = asyncTester(() => Promise.resolve(true), () => "test3");
    const tester2 = asyncTester(() => Promise.resolve(true), () => "test3");
    const e = await asyncExecWithReducer(defaultReducer, tester1, tester2);

    assert.deepStrictEqual(e, {
      error: false,
      message: ""
    });
  });

  test("reports first failed test", async () => {
    const tester1 = asyncTester(() => Promise.resolve(true), () => "test1");
    const tester2 = asyncTester(
      () => Promise.reject(new Error("error")),
      () => "test2"
    );
    const tester3 = asyncTester(() => Promise.resolve(true), () => "test3");
    const e = await asyncExecWithReducer(
      defaultReducer,
      tester1,
      tester2,
      tester3
    );

    assert.deepStrictEqual(e, {
      error: true,
      message: "test2"
    });
  });
});

describe.skip("asyncExec", () => {
  test("combine multiple asyncTesters", async () => {
    const tester1 = asyncTester(() => Promise.resolve(true), () => "test1");
    const tester2 = asyncTester(
      () => Promise.reject(new Error("error")),
      () => "test2"
    );
    const tester3 = asyncTester(() => Promise.resolve(true), () => "test3");
    const e = await asyncExec(tester1, tester2, tester3);

    assert.deepStrictEqual(e, {
      error: true,
      message: "test2"
    });
  });
});

describe.skip("converToAsync", () => {
  test("convert to asyncTeter", async () => {
    const tester1 = asyncTester(() => Promise.resolve(true), () => "");
    const tester2 = tester(() => false, () => "test2");
    const tester3 = tester(() => true, () => "");
    const e = await asyncExec(tester1, toAsync(tester2), toAsync(tester3));

    assert.deepStrictEqual(e, {
      error: true,
      message: "test2"
    });
  });
});

const compose: (...t: Validator[]) => Validator = (...testers) => {
  return () => ({ error: false, message: "" });
};

describe.skip("compose", () => {
  test("compose must be return validator", () => {
    const v = compose(
      tester(() => false, () => ""),
      tester(() => false, () => "")
    );
    assert.deepStrictEqual(v(), {
      error: false,
      message: ""
    });
  });
});
