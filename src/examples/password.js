import {combine, required, tester} from '../main';

const REQUIRED_PASSWORD_CONFIRMATION_MESSAGE = () => 'required.';
const PASSWORD_NOT_MATCHED_MESSAGE = () => 'password not matched.';

export const passwordConfirmationValidator = (
  password,
  passwordConfirmation,
) => {
  return combine(
    required(REQUIRED_PASSWORD_CONFIRMATION_MESSAGE),
    tester((confirmation, origin) => {
      return confirmation === origin;
    }, PASSWORD_NOT_MATCHED_MESSAGE),
  )(passwordConfirmation, password);
};
