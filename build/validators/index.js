"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
const core_1 = require("../core");
const util_1 = require("../util");
var numbers_1 = require("./numbers");
exports.min = numbers_1.min;
exports.max = numbers_1.max;
var strings_1 = require("./strings");
exports.minLength = strings_1.minLength;
exports.maxLength = strings_1.maxLength;
exports.regexp = strings_1.regexp;
exports.required = (v, messager) => {
    if (_.isString(v)) {
        v = _.trim(v);
    }
    return core_1.tester(() => {
        return !util_1.isBlank(v);
    }, messager);
};
//# sourceMappingURL=index.js.map