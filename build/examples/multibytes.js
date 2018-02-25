"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("../core");
const validators_1 = require("../validators");
const REQUIRED_NAME = () => "名前を入力してください。";
const HALF_KANA_REGEX = /[ｦ-ﾟ]/;
const HALF_KANA_MESSAGE = name => () => `${name}に半角文字が含まれています。`;
exports.halfKanaValidator = name => {
    return core_1.exec(validators_1.required(name, REQUIRED_NAME), validators_1.regexp(name, HALF_KANA_REGEX, HALF_KANA_MESSAGE(name), {
        exclude: true
    }));
};
//# sourceMappingURL=multibytes.js.map