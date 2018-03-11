import * as assert from "power-assert";

export function helper(tester, arg, expect) {
  assert.deepStrictEqual(tester(arg), expect);
}

export async function asyncHelper(tester, arg, expect) {
  assert.deepStrictEqual(await tester(arg), expect);
}
