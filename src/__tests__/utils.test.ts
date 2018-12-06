import * as assert from "power-assert";
import { isBlank } from "../util";

describe("isBlank", () => {
  test("expected true when got null", () => {
    const actual = isBlank(null);
    assert.equal(actual, true);
  });

  test("expected true when got undefined", () => {
    const actual = isBlank(undefined);
    assert.equal(actual, true);
  });

  test("expected true when got []", () => {
    const actual = isBlank([]);
    assert.equal(actual, true);
  });

  test("expected true when got ''", () => {
    const actual = isBlank("");
    assert.equal(actual, true);
  });

  test("expected true when got {}", () => {
    const actual = isBlank({});
    assert.equal(actual, true);
  });

  test("expected false when got 0", () => {
    const actual = isBlank(0);
    assert.equal(actual, false);
  });

  test("expected false when got [1]", () => {
    const actual = isBlank([1]);
    assert.equal(actual, false);
  });

  test("expected false when got 'hoge'", () => {
    const actual = isBlank("hoge");
    assert.equal(actual, false);
  });

  test("expected false when got { length: 1 }", () => {
    const actual = isBlank({ length: 1 });
    assert.equal(actual, false);
  });

  test("expected false when got { valueOf: null }", () => {
    const actual = isBlank({ valueOf: null });
    assert.equal(actual, false);
  });
});
