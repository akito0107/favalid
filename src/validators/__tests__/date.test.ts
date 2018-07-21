import maxDate from "../date.max";
import minDate from "../date.min";
import { helper } from "./helper";

describe("date", () => {
  test("minDate", () => {
    helper(minDate(new Date(1990, 1), () => ""), new Date(1990, 2), {
      error: false,
      message: ""
    });
  });
  test("minDate:boundary", () => {
    helper(minDate(new Date(1990, 1), () => "error"), new Date(1990, 1), {
      error: true,
      message: "error"
    });
  });
  test("minDate:fail", () => {
    helper(minDate(new Date(1990, 1), () => "error"), new Date(1989, 2), {
      error: true,
      message: "error"
    });
  });
  test("maxDate", () => {
    helper(maxDate(new Date(1990, 1), () => ""), new Date(1989, 2), {
      error: false,
      message: ""
    });
  });
  test("maxDate:boundary", () => {
    helper(maxDate(new Date(1990, 1), () => "error"), new Date(1990, 1), {
      error: true,
      message: "error"
    });
  });
  test("maxDate:fail", () => {
    helper(maxDate(new Date(1990, 1), () => "error"), new Date(1990, 2), {
      error: true,
      message: "error"
    });
  });
});
