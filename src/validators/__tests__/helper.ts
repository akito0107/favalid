import * as assert from "power-assert";

export function helper(tester, arg, expect) {
  assert.deepStrictEqual(tester(arg), expect);
}
