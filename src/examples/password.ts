import { exec, tester } from "../core";
import { required } from "../validators";

const REQUIRED_PASSWORD_CONFIRMATION_MESSAGE = () => "required.";
const PASSWORD_NOT_MATCHED_MESSAGE = () => "password not matched.";

export const passwordConfirmationValidator = (
  password,
  passwordConfirmation
) => {
  return exec(
    required(REQUIRED_PASSWORD_CONFIRMATION_MESSAGE),
    tester((confirmation, origin) => {
      return confirmation === origin;
    }, PASSWORD_NOT_MATCHED_MESSAGE)
  )(passwordConfirmation, password);
};
