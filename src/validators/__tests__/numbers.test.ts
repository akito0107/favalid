import {
  integer,
  lessThan,
  max,
  min,
  moreThan,
  negative,
  positive
} from "../numbers";
import { helper } from "./helper";

describe("number validator", () => {
  test("min", () => {
    helper(min(2, () => "error"), 1, {
      error: false,
      message: ""
    });
  });

  test("min:boundary", () => {
    helper(min(2, () => "error"), 2, {
      error: true,
      message: "error"
    });
  });

  test("min:fail", () => {
    helper(min(1, () => "error"), 2, {
      error: true,
      message: "error"
    });
  });

  test("max", () => {
    helper(max(1, () => "error"), 2, {
      error: false,
      message: ""
    });
  });

  test("max:boundary", () => {
    helper(max(2, () => "error"), 2, {
      error: true,
      message: "error"
    });
  });

  test("max:fail", () => {
    helper(max(3, () => "error"), 2, {
      error: true,
      message: "error"
    });
  });

  test("lessThan", () => {
    helper(lessThan(3, () => "error"), 2, {
      error: false,
      message: ""
    });
  });

  test("lessThan:boundary", () => {
    helper(lessThan(3, () => "error"), 3, {
      error: false,
      message: ""
    });
  });

  test("lessThan:fail", () => {
    helper(lessThan(3, () => "error"), 4, {
      error: true,
      message: "error"
    });
  });

  test("moreThan", () => {
    helper(moreThan(3, () => "error"), 4, {
      error: false,
      message: ""
    });
  });

  test("moreThan:boundary", () => {
    helper(moreThan(3, () => "error"), 3, {
      error: false,
      message: ""
    });
  });

  test("moreThan:fail", () => {
    helper(moreThan(3, () => "error"), 2, {
      error: true,
      message: "error"
    });
  });

  test("integer", () => {
    helper(integer(() => "error"), 2, {
      error: false,
      message: ""
    });
  });

  test("integer:fail", () => {
    helper(integer(() => "error"), 2.1, {
      error: true,
      message: "error"
    });
  });

  test("positive", () => {
    helper(positive(() => "error"), 1, {
      error: false,
      message: ""
    });
  });

  test("positive:fail", () => {
    helper(positive(() => "error"), -1, {
      error: true,
      message: "error"
    });
  });

  test("negative", () => {
    helper(negative(() => "error"), -1, {
      error: false,
      message: ""
    });
  });

  test("negative:fail", () => {
    helper(negative(() => "error"), 1, {
      error: true,
      message: "error"
    });
  });
});
