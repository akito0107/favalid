import { exec, execWithReducer } from "../core";
import { isBlank } from "../util";
import { maxLength, minLength, regexp, required } from "../validators";

const REQUIRED_EMAIL_MESSAGE = () => "required.";

const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const REGEXP_MESSAGE = () => "invalid email.";

const EMAIL_MAX_LENGTH = 100;
const MAX_LENGTH_MESSAGE = () => "exceeds 100 letters.";

const EMAIL_MIN_LENGTH = 10;
const MIN_LENGTH_MESSAGE = () => "at least 10 letters.";

export const emailValidator = email => {
  return exec(
    required(email, REQUIRED_EMAIL_MESSAGE),
    minLength(email, EMAIL_MIN_LENGTH, MIN_LENGTH_MESSAGE),
    maxLength(email, EMAIL_MAX_LENGTH, MAX_LENGTH_MESSAGE),
    regexp(email, EMAIL_REGEXP, REGEXP_MESSAGE, {})
  );
};

export const emailValidatorWithReducer = email => {
  const reducer = (prevError, currentError) => {
    const error = prevError.error || currentError.error;
    let message = prevError.message;
    message =
      currentError.error && isBlank(message)
        ? currentError.message
        : message + " / " + currentError.message;

    return { error, message };
  };

  return execWithReducer(
    reducer,
    required(email, REQUIRED_EMAIL_MESSAGE),
    minLength(email, EMAIL_MIN_LENGTH, MIN_LENGTH_MESSAGE),
    maxLength(email, EMAIL_MAX_LENGTH, MAX_LENGTH_MESSAGE),
    regexp(email, EMAIL_REGEXP, REGEXP_MESSAGE, {})
  );
};
