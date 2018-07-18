import {
  combine,
  combineWithReducer,
  maxLength,
  minLength,
  regexp,
  required
} from "../main";
import { isBlank } from "../util";

const REQUIRED_EMAIL_MESSAGE = () => "required.";

const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const REGEXP_MESSAGE = () => "invalid email.";

const EMAIL_MAX_LENGTH = 100;
const MAX_LENGTH_MESSAGE = () => "exceeds 100 letters.";

const EMAIL_MIN_LENGTH = 10;
const MIN_LENGTH_MESSAGE = () => "at least 10 letters.";

export const emailValidator = (email: string) => {
  return combine(
    required(REQUIRED_EMAIL_MESSAGE),
    minLength(EMAIL_MIN_LENGTH, MIN_LENGTH_MESSAGE),
    maxLength(EMAIL_MAX_LENGTH, MAX_LENGTH_MESSAGE),
    regexp(EMAIL_REGEXP, REGEXP_MESSAGE, {})
  )(email);
};

export const emailValidatorWithReducer = (email: string) => {
  const reducer = (prevError, currentError) => {
    const error = prevError.error || currentError.error;
    let message = prevError.message;
    if (currentError.error) {
      message = isBlank(message)
        ? currentError.message
        : message + " / " + currentError.message;
    }
    return { error, message };
  };

  return combineWithReducer(
    reducer,
    { error: false, message: "" },
    required(REQUIRED_EMAIL_MESSAGE),
    minLength(EMAIL_MIN_LENGTH, MIN_LENGTH_MESSAGE),
    maxLength(EMAIL_MAX_LENGTH, MAX_LENGTH_MESSAGE),
    regexp(EMAIL_REGEXP, REGEXP_MESSAGE, {})
  )(email);
};

export const emailValidatorWithMultipleErrorReducer = (email: string) => {
  const reducer = (prevError, currentError) => {
    if (currentError.error) {
      prevError.push(currentError);
    }
    return prevError;
  };

  return combineWithReducer(
    reducer,
    [],
    required(REQUIRED_EMAIL_MESSAGE),
    minLength(EMAIL_MIN_LENGTH, MIN_LENGTH_MESSAGE),
    maxLength(EMAIL_MAX_LENGTH, MAX_LENGTH_MESSAGE),
    regexp(EMAIL_REGEXP, REGEXP_MESSAGE, {})
  )(email);
};
