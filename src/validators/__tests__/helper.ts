import * as assert from "power-assert";
import { AsyncValidator, Validator } from "../../core";

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
