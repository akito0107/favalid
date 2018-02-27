"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const validators_1 = require("../validators");
const USERDB = {
    "example@hello.com": true
};
const apiRequest = t => () => __awaiter(this, void 0, void 0, function* () {
    if (USERDB[t]) {
        return Promise.resolve(true);
    }
    return Promise.reject(new Error("user not exists"));
});
exports.asyncValidator = (target) => __awaiter(this, void 0, void 0, function* () {
    return core_1.asyncExec(core_1.toAsync(validators_1.minLength(target, 10, () => "at least 10 letters.")), core_1.asyncTester(apiRequest(target), () => "api check failed"));
});
exports.asyncValidatorWithReason = (target) => __awaiter(this, void 0, void 0, function* () {
    return core_1.asyncExec(core_1.toAsync(validators_1.minLength(target, 10, () => "at least 10 letters.")), core_1.asyncTester(apiRequest(target), e => `api check failed with reason: ${e.message}`));
});
//# sourceMappingURL=async.js.map