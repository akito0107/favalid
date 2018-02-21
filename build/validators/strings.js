"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const util_1 = require("../util");
exports.minLength = (target, limit, messager) => {
    return core_1.tester(() => {
        return util_1.strlen(target) > limit;
    }, messager);
};
exports.maxLength = (target, limit, messager) => {
    return core_1.tester(() => {
        return util_1.strlen(target) < limit;
    }, messager);
};
exports.regexp = (target, regex, messager, { exclude = false }) => {
    if (exclude) {
        return core_1.tester(() => !regex.test(target), messager);
    }
    else {
        return core_1.tester(() => regex.test(target), messager);
    }
};
//# sourceMappingURL=strings.js.map