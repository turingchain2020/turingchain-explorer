"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
// import BtyBaseSdk from "./index";

/**
 * @description 比较版本
 * @param {string} myV
 * @param {string} compareV
 * @returns {number} -1: 前者比后者小， 0: 版本相同, 1： 前者比后者大
 */
function versionCompare(myV, compareV) {
    var myVNums = myV.split('.');
    var compareVNums = compareV.split('.');
    var result = -1;
    for (var i = 0; i < myVNums.length; i++) {
        if (+myVNums[i] < +compareVNums[i]) {
            result = -1;
            break;
        }
        else if (+myVNums[i] > +compareVNums[i]) {
            result = 1;
            break;
        }
        else {
            result = 0;
            continue;
        }
    }
    return result;
}
export default versionCompare;
// exports.versionCompare = versionCompare;
//# sourceMappingURL=tools.js.map
