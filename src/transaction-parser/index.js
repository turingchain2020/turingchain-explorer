"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
var txmap_1 = require("./txmap");
var tools = require("./tools");
/**
 * @description 解析交易内容
 * @param {string}  execer 执行器
 * @param {any} payload 交易内容
 * @param {string}  [lang='cn'] 解析后语言选择, 默认是中文
 * @returns {object}
 */
export function txParser(execer, payload, lang) {
    if (lang === void 0) { lang = 'cn'; }
    if (/^user\./.test(execer))
        return { execerName: execer, action: {} };
    if (/^user\.p\./.test(execer))
        return { execerName: '平行链', action: {} };
    if (!txmap_1.default[execer]) {
        console.warn('execer name undefined in tx parser', execer);
        return { execerName: execer, action: {} };
    }
    // 5.0.2.xxxx版本
    if (payload.Value) {
        payload = payload.Value;
    }
    var execerName = txmap_1.default[execer]['name'][lang];
    var action = {};
    if (payload) {
        if (payload.ty) {
            delete payload.ty;
        }
        var actionKey = Object.keys(payload)[0];
        if (actionKey) {
            // 转小写
            var actionKeyInMap = actionKey.toLowerCase();
            var actionmap = txmap_1.default[execer]['actions'][actionKeyInMap];
            if (!actionmap) {
                console.warn('undefined actionKey', actionKey);
                return { execerName: execer, action: {} };
            }
            action = {
                name: actionmap['name'][lang],
                amount: actionmap["coinAmount"] ? Number(payload[actionKey][actionmap["coinAmount"]]) : 0,
                coin: actionmap["coinSymbol"] ? payload[actionKey][actionmap["coinSymbol"]] : actionmap["coinStaticSymbol"]
            };
        }
    }
    return { execerName: execerName, action: action };
}
// exports.txParser = txParser;
/**
* @description 解析交易内容
* @param {string}  execer 执行器
* @param {any} payload 交易内容
* @param {string}  [lang='cn'] 解析后语言选择, 默认是中文
* @returns {string}  输出信息为字符串
*/
export function txInWords(execer, payload, lang) {
    if (lang === void 0) { lang = 'cn'; }
    var _a = txParser(execer, payload, lang), execerName = _a.execerName, action = _a.action;
    return execerName + " " + JSON.stringify(action);
}
// exports.txInWords = txInWords;
/**
 * 转换交易中的note字段
 * 服务器端考虑到有些 note 是 二进制的
 * protocol buffer 无法保存 非 utf-8 的字符串，所以采用的格式是 bytes
 * 这样，json 自动转成了 hex 格式
 * @export
 * @param {string} note
 * @returns {string}
 */
export function parseTransferNote(note) {
    // 低版本的区块链节点的note字段不需要转换
    if (!/^0\x/.test(note)) {
        return note;
    }
    return tools.utf82rstr(tools.hex2str(note.substr(2)));
}

// exports.parseTransferNote = parseTransferNote;
