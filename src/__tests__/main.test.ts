import assert from "power-assert";
import { add } from "../main";

test("add", () => {
  assert.strictEqual(2, add(1, 1));
});
