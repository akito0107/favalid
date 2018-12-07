import * as assert from "power-assert";
import { AsyncValidator, ValueValidator } from "../../core";

export function helper(validator: ValueValidator, arg: any, expect: any) {
  assert.deepStrictEqual(validator(arg), expect);
}

export async function asyncHelper(
  validator: AsyncValidator,
  arg: any,
  expect: any
) {
  assert.deepStrictEqual(await validator(arg), expect);
}
