import * as assert from "power-assert";
import { combine, tester } from "../core";
import { emailValidator } from "../examples/email";
import {
  conditional,
  maxLength,
  minLength,
  required,
  safeShape
} from "../main";
import { shape } from "../schema";
import { isString } from "../util";

describe("schema", () => {
  test("no error", () => {
    const validator = shape({
      value: tester(
        () => false,
        () => "test"
      )
    });
    assert.deepStrictEqual(validator({ value: true }), {
      value: { error: true, message: "test" }
    });
  });
  test("multiple row", () => {
    const validator = shape({
      bar: tester(
        () => true,
        () => "bar"
      ),
      foo: tester(
        () => false,
        () => "foo"
      )
    });
    assert.deepStrictEqual(validator({ foo: true, bar: true }), {
      bar: { error: false, message: "" },
      foo: { error: true, message: "foo" }
    });
  });
  test("combined validator", () => {
    const validator = shape({
      email: emailValidator,
      password: combine(
        minLength(10, () => "at least 10 letters."),
        maxLength(16, () => "maximum: 16 letters.")
      )
    });

    [
      {
        in: { email: "test@test.com", password: "12345678910" },
        out: {
          email: { error: false, message: "" },
          password: { error: false, message: "" }
        }
      },
      {
        in: { email: "testtest.com", password: "178910" },
        out: {
          email: { error: true, message: "invalid email." },
          password: { error: true, message: "at least 10 letters." }
        }
      },
      {
        in: {
          email: "testtest.com",
          password: "178910",
          unknownprop: "unknown"
        },
        out: {
          email: { error: true, message: "invalid email." },
          password: { error: true, message: "at least 10 letters." }
        }
      }
    ].forEach(c => {
      assert.deepStrictEqual(validator(c.in), c.out);
    });
  });

  test("with conditional", () => {
    const nameValidator = combine(
      minLength(5, () => "at least 10 letters."),
      maxLength(16, () => "maximum: 16 letters.")
    );
    const stringRequired = combine(
      required(() => "required"),
      tester(
        str => isString(str),
        () => "must be string"
      )
    );

    const validator = shape({
      email: conditional(stringRequired, emailValidator),
      name: conditional(
        required(() => "required"),
        shape({
          first: conditional(stringRequired, nameValidator),
          last: conditional(stringRequired, nameValidator)
        })
      )
    });

    [
      {
        in: { email: "", name: { first: "", last: "" } },
        out: {
          email: {
            error: true,
            message: "required",
            preconditionCheckFailed: true
          },
          name: {
            first: {
              error: true,
              message: "required",
              preconditionCheckFailed: true
            },
            last: {
              error: true,
              message: "required",
              preconditionCheckFailed: true
            }
          }
        }
      },
      {
        in: { email: null, name: { first: 123, last: undefined } },
        out: {
          email: {
            error: true,
            message: "required",
            preconditionCheckFailed: true
          },
          name: {
            first: {
              error: true,
              message: "must be string",
              preconditionCheckFailed: true
            },
            last: {
              error: true,
              message: "required",
              preconditionCheckFailed: true
            }
          }
        }
      },
      {
        in: { name: { first: "123456", last: "123456" } },
        out: {
          email: {
            error: true,
            message: "required",
            preconditionCheckFailed: true
          },
          name: {
            first: { error: false, message: "" },
            last: { error: false, message: "" }
          }
        }
      },
      {
        in: {},
        out: {
          email: {
            error: true,
            message: "required",
            preconditionCheckFailed: true
          },
          name: {
            error: true,
            message: "required",
            preconditionCheckFailed: true
          }
        }
      }
    ].forEach(c => {
      assert.deepStrictEqual(validator(c.in), c.out);
    });
  });

  test("ultra nested case with safeShape", () => {
    const nameValidator = combine(
      minLength(5, () => "at least 10 letters."),
      maxLength(16, () => "maximum: 16 letters.")
    );
    const stringRequired = combine(
      required(() => "required"),
      tester(
        str => isString(str),
        () => "must be string"
      )
    );

    const validator = safeShape({
      name: safeShape({
        nameBrother: nameValidator,
        nameChild: safeShape({
          nameGrandChild: safeShape({
            first: conditional(stringRequired, nameValidator)
          })
        })
      })
    });

    [
      {
        in: {
          name: {
            nameBrother: "123456",
            nameChild: {
              nameGrandChild: {
                first: "123456"
              }
            }
          }
        },
        out: {
          name: {
            nameBrother: { error: false, message: "" },
            nameChild: {
              nameGrandChild: {
                first: { error: false, message: "" }
              }
            }
          }
        }
      },
      {
        in: {
          name: {
            nameBrother: "123456",
            nameChild: {
              nameGrandChild: {} // treat as a blank
            }
          }
        },
        out: {
          name: {
            nameBrother: { error: false, message: "" },
            nameChild: {
              nameGrandChild: {
                error: true,
                message: "blank",
                preconditionCheckFailed: true
              }
            }
          }
        }
      },
      {
        in: {
          name: {
            nameBrother: "123456",
            nameChild: {}
          }
        },
        out: {
          name: {
            nameBrother: { error: false, message: "" },
            nameChild: {
              error: true,
              message: "blank",
              preconditionCheckFailed: true
            }
          }
        }
      },
      {
        in: {
          name: {}
        },
        out: {
          name: { error: true, message: "blank", preconditionCheckFailed: true }
        }
      }
    ].forEach(c => {
      assert.deepStrictEqual(validator(c.in), c.out);
    });
  });
});
