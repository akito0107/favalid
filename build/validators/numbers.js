"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
exports.min = (v, limit, messager) => {
    return core_1.tester(() => {
        return v <= limit;
    }, messager);
};
exports.max = (v, limit, messager) => {
    return core_1.tester(() => {
        return v > limit;
    }, messager);
};
//# sourceMappingURL=numbers.js.map