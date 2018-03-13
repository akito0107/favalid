// @flow

import assert from "power-assert";
import type { AsyncValidator, Validator } from "../../core";

export function helper(validator: Validator, arg: any, expect: any) {
  assert.deepStrictEqual(validator(arg), expect);
}

export async function asyncHelper(
  validator: AsyncValidator,
  arg: any,
  expect: any
) {
  assert.deepStrictEqual(await validator(arg), expect);
}
