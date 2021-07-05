"use strict";
// Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 补齐左侧字符串
 *
 * @export
 * @param {string} str
 * @param {string} pad
 * @param {number} len
 * @returns {string}
 */
export function strlpad(str, pad, len) {
    while (str.length < len) {
        str = pad + str;
    }
    return str;
}
// exports.strlpad = strlpad;
/**
 * 补齐右侧字符串
 *
 * @export
 * @param {string} str
 * @param {string} pad
 * @param {number} len
 * @returns {string}
 */
export function strrpad(str, pad, len) {
    while (str.length < len) {
        str = str + pad;
    }
    return str;
}
// exports.strrpad = strrpad;
/**
 *
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export function str2bin(str) {
    var output = "";
    for (var i = 0; i < str.length; i++) {
        output += strlpad(str.charCodeAt(i).toString(2), "0", 8);
    }
    return output;
}
// exports.str2bin = str2bin;
/**
 *
 *
 * @export
 * @param {string} bin
 * @returns {string}
 */
export function bin2str(bin) {
    var s = strpart(bin, 8), output = "";
    for (var i = 0; i < s.length; i++) {
        output += String.fromCharCode(parseInt(s[i], 2));
    }
    return output;
}
// exports.bin2str = bin2str;
/**
 * unicode 转十六进制字符串
 *
 * @export
 * @param {string} str
 * @returns {string}
 */
export function str2hex(str) {
    var output = "";
    for (var i = 0; i < str.length; i++) {
        output += strlpad(str.charCodeAt(i).toString(16), "0", 2).toUpperCase();
    }
    return output;
}
// exports.str2hex = str2hex;
/**
 * 十六进制字符串转unicode
 *
 * @export
 * @param {string} hex
 * @returns {string}
 */
export function hex2str(hex) {
    var s = strpart(hex, 2), output = "";
    for (var i = 0; i < s.length; i++) {
        output += String.fromCharCode(parseInt(s[i], 16));
    }
    return output;
}
// exports.hex2str = hex2str;
// Converts a raw javascript string into a string of single byte characters using utf8 encoding.
// This makes it easier to perform other encoding operations on the string.
/**
 * unicode字符串转utf8编码
 *
 * @export
 * @param {string} input
 * @returns {string}
 */
export function rstr2utf8(input) {
    var output = "";
    for (var n = 0; n < input.length; n++) {
        var c = input.charCodeAt(n);
        if (c < 128) {
            output += String.fromCharCode(c);
        }
        else if ((c > 127) && (c < 2048)) {
            output += String.fromCharCode((c >> 6) | 192);
            output += String.fromCharCode((c & 63) | 128);
        }
        else {
            output += String.fromCharCode((c >> 12) | 224);
            output += String.fromCharCode(((c >> 6) & 63) | 128);
            output += String.fromCharCode((c & 63) | 128);
        }
    }
    return output;
}
// exports.rstr2utf8 = rstr2utf8;
/**
 * utf8编码转unicode
 *
 * @export
 * @param {string} input
 * @returns {string}
 */
export function utf82rstr(input) {
    var output = "";
    var i = 0;
    var c = 0;
    var c2 = 0;
    var c3 = 0;
    while (i < input.length) {
        c = input.charCodeAt(i);
        if (c < 128) {
            output += String.fromCharCode(c);
            i++;
        }
        else if ((c > 191) && (c < 224)) {
            c2 = input.charCodeAt(i + 1);
            output += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
        }
        else {
            c2 = input.charCodeAt(i + 1);
            c3 = input.charCodeAt(i + 2);
            output += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
        }
    }
    return output;
}
// exports.utf82rstr = utf82rstr;
// Split a string every nth character, starting from the left.
// If n is negative, string will be split starting from the right.
export function strpart(str, n) {
    if (n > 0) {
        return str.match(new RegExp(".{1," + n + "}", "g"));
    }
    else if (n < 0) {
        var an = Math.abs(n);
        var t1 = (Math.ceil(str.length / an) * an) - str.length;
        var t2 = "";
        for (var i = 0; i < t1; i++) {
            t2 += "_";
        }
        t2 += str;
        t2 = t2.match(new RegExp(".{1," + an + "}", "g"));
        t2[0] = t2[0].substr(t1, an - t1);
        return t2;
    }
}

// exports.strpart = strpart;
