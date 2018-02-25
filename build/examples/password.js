"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const validators_1 = require("../validators");
const REQUIRED_PASSWORD_CONFIRMATION_MESSAGE = () => "required.";
const PASSWORD_NOT_MATCHED_MESSAGE = () => "password not matched.";
exports.passwordConfirmationValidator = (password, passwordConfirmation) => {
    return core_1.exec(validators_1.required(passwordConfirmation, REQUIRED_PASSWORD_CONFIRMATION_MESSAGE), core_1.tester(() => {
        return password === passwordConfirmation;
    }, PASSWORD_NOT_MATCHED_MESSAGE));
};
//# sourceMappingURL=password.js.map