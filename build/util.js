"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require("lodash");
exports.strlen = (str) => [...str].length;
exports.isBlank = s => {
    return (_.isEmpty(s) && !_.isNumber(s)) || _.isNaN(s);
};
//# sourceMappingURL=util.js.map