import { exec, tester } from "../core";
import { required } from "../validators";

const REQUIRED_PASSWORD_CONFIRMATION_MESSAGE = () => "required.";
const PASSWORD_NOT_MATCHED_MESSAGE = () => "password not matched.";

export const passwordConfirmationValidator = (
  password,
  passwordConfirmation
) => {
  return exec(
    required(passwordConfirmation, REQUIRED_PASSWORD_CONFIRMATION_MESSAGE),
    tester(() => {
      return password === passwordConfirmation;
    }, PASSWORD_NOT_MATCHED_MESSAGE)
  );
};
