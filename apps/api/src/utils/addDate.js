"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addDate = void 0;
var ms_1 = require("ms");
var addDate = function (interval, date) {
    var diff = (0, ms_1.default)(interval);
    if (date) {
        return new Date(date.getTime() + diff);
    }
    return new Date(Date.now() + diff);
};
exports.addDate = addDate;
console.log((0, exports.addDate)("1d").getTime());
