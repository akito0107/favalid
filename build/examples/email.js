"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const util_1 = require("../util");
const validators_1 = require("../validators");
const REQUIRED_EMAIL_MESSAGE = () => "required.";
const EMAIL_REGEXP = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const REGEXP_MESSAGE = () => "invalid email.";
const EMAIL_MAX_LENGTH = 100;
const MAX_LENGTH_MESSAGE = () => "exceeds 100 letters.";
const EMAIL_MIN_LENGTH = 10;
const MIN_LENGTH_MESSAGE = () => "at least 10 letters.";
exports.emailValidator = email => {
    return core_1.exec(validators_1.required(email, REQUIRED_EMAIL_MESSAGE), validators_1.minLength(email, EMAIL_MIN_LENGTH, MIN_LENGTH_MESSAGE), validators_1.maxLength(email, EMAIL_MAX_LENGTH, MAX_LENGTH_MESSAGE), validators_1.regexp(email, EMAIL_REGEXP, REGEXP_MESSAGE, {}));
};
exports.emailValidatorWithReducer = email => {
    const reducer = (prevError, currentError) => {
        const error = prevError.error || currentError.error;
        let message = prevError.message;
        if (currentError.error) {
            message = util_1.isBlank(message)
                ? currentError.message
                : message + " / " + currentError.message;
        }
        return { error, message };
    };
    return core_1.execWithReducer(reducer, validators_1.required(email, REQUIRED_EMAIL_MESSAGE), validators_1.minLength(email, EMAIL_MIN_LENGTH, MIN_LENGTH_MESSAGE), validators_1.maxLength(email, EMAIL_MAX_LENGTH, MAX_LENGTH_MESSAGE), validators_1.regexp(email, EMAIL_REGEXP, REGEXP_MESSAGE, {}));
};
//# sourceMappingURL=email.js.map