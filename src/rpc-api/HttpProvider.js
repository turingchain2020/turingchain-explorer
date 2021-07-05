"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
// Object.defineProperty(exports, "__esModule", { value: true });
var json_bigint_1 = __importDefault(require("json-bigint"));
var HttpProvider = /** @class */ (function () {
    function HttpProvider(url, errorHandler) {
        if (errorHandler === void 0) { errorHandler = null; }
        this.url = url;
        this.errorHandler = errorHandler;
    }
    HttpProvider.prototype.setUrl = function (url) {
        this.url = url;
    };
    HttpProvider.prototype.doFetch = function (config) {
        var _this = this;
        var _a = config.httpHeaders, httpHeaders = _a === void 0 ? {} : _a, postdata = config.postdata;
        var url = config.url;
        if (!url)
            url = this.url;
        var headers = __assign({ 'Content-Type': 'text/plain' }, httpHeaders);
        var reqConfig = {
            method: 'POST',
            headers: headers,
            redirect: 'follow',
        };
        if (postdata) {
            reqConfig['body'] = JSON.stringify(postdata);
        }
        return fetch(url, reqConfig).then(this.checkStatus)
            .then(function (resp) { return resp.text().then(function (text) { return json_bigint_1.default.parse(text); }); })
            .catch(function (e) {
            if (_this.errorHandler) {
                _this.errorHandler(e);
            }
            else {
                throw e;
            }
        });
    };
    HttpProvider.prototype.checkStatus = function (response) {
        if (response.status >= 200 && response.status < 300) {
            return response;
        }
        else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    };
    return HttpProvider;
}());
export default HttpProvider;

// exports.default = HttpProvider;
//# sourceMappingURL=HttpProvider.js.map
