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
exports.defaultReducer = (m, e) => {
    if (m.error) {
        return m;
    }
    return e;
};
exports.exec = (...tests) => {
    return exports.execWithReducer(exports.defaultReducer, ...tests);
};
exports.asyncTester = (fn, messager) => () => __awaiter(this, void 0, void 0, function* () {
    try {
        const valid = yield fn();
        if (valid) {
            return { error: false, message: "" };
        }
        return { error: true, message: messager() };
    }
    catch (e) {
        return { error: true, message: messager() };
    }
});
exports.asyncExecWithReducer = (reducer, ...t) => __awaiter(this, void 0, void 0, function* () {
    const validators = t.map(test => test());
    const results = yield Promise.all(validators);
    return results.reduce((m, error) => {
        return reducer(m, error);
    }, { error: false, message: "" });
});
exports.asyncExec = (...tests) => {
    return exports.asyncExecWithReducer(exports.defaultReducer, ...tests);
};
exports.toAsync = t => () => __awaiter(this, void 0, void 0, function* () {
    return Promise.resolve(t());
});
//# sourceMappingURL=core.js.map