import {
  asyncCombine,
  asyncCombineWithReducer,
  asyncTester,
  toAsync
} from "../async";

import { defaultReducer, tester } from "../core";

import { asyncHelper } from "../validators/__tests__/helper";

describe("async", () => {
  test("basic", async () => {
    await asyncHelper(
      asyncTester(() => {
        return Promise.resolve(true);
      }, () => ""),
      null,
      {
        error: false,
        message: ""
      }
    );
  });

  test("should be invalid", async () => {
    await asyncHelper(
      asyncTester(() => {
        return Promise.resolve(false);
      }, () => "error"),
      null,
      {
        error: true,
        message: "error"
      }
    );
  });

  test("fail Promise.resolve", async () => {
    await asyncHelper(
      asyncTester(() => {
        return Promise.reject(new Error("message"));
      }, () => "error"),
      null,
      {
        error: true,
        message: "error"
      }
    );
  });

  test("with async function", async () => {
    await asyncHelper(
      asyncTester(async () => {
        return true;
      }, () => ""),
      null,
      {
        error: false,
        message: ""
      }
    );
  });
});

describe("asyncCombine (with Reducer)", () => {
  test("combine multiple asyncTesters", async () => {
    const tester1 = asyncTester(() => Promise.resolve(true), () => "test3");
    const tester2 = asyncTester(() => Promise.resolve(true), () => "test3");
    await asyncHelper(
      asyncCombineWithReducer(defaultReducer, tester1, tester2),
      null,
      {
        error: false,
        message: ""
      }
    );
  });

  test("reports first failed test", async () => {
    const tester1 = asyncTester(() => Promise.resolve(true), () => "test1");
    const tester2 = asyncTester(
      () => Promise.reject(new Error("error")),
      () => "test2"
    );
    const tester3 = asyncTester(() => Promise.resolve(true), () => "test3");
    await asyncHelper(
      asyncCombineWithReducer(defaultReducer, tester1, tester2, tester3),
      null,
      {
        error: true,
        message: "test2"
      }
    );
  });
});

describe("asyncCombine", () => {
  test("combine multiple asyncTesters", async () => {
    const tester1 = asyncTester(() => Promise.resolve(true), () => "test1");
    const tester2 = asyncTester(
      () => Promise.reject(new Error("error")),
      () => "test2"
    );
    const tester3 = asyncTester(() => Promise.resolve(true), () => "test3");
    await asyncHelper(asyncCombine(tester1, tester2, tester3), null, {
      error: true,
      message: "test2"
    });
  });
});

describe("convertToAsync", () => {
  test("convert to asyncTeter", async () => {
    const tester1 = asyncTester(() => Promise.resolve(true), () => "");
    const tester2 = tester(() => false, () => "test2");
    const tester3 = tester(() => true, () => "");
    await asyncHelper(
      asyncCombine(tester1, toAsync(tester2), toAsync(tester3)),
      null,
      {
        error: true,
        message: "test2"
      }
    );
  });
});
