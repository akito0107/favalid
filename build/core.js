"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tester = (test, messager) => () => {
    if (!test()) {
        return { error: true, message: messager() };
    }
    return { error: false, message: "" };
};
exports.execWithReducer = (reducer, ...tests) => {
    return tests.reduce((m, test) => {
        return reducer(m, test());
    }, { error: false, message: "" });
};
const defaultReducer = (m, e) => {
    if (m.error) {
        return m;
    }
    return e;
};
exports.exec = (...tests) => {
    return exports.execWithReducer(defaultReducer, ...tests);
};
//# sourceMappingURL=core.js.map