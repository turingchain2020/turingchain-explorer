"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};

var HttpProvider_1 = __importDefault(require("./HttpProvider"));
var tools_1 = require("./tools");
/**
 * @description 封装chain API
 * @export
 * @class BtyBaseSdk
 */
var BtyBaseSdk = /** @class */ (function () {
    /**
     *Creates an instance of BtyBaseSdk.
     * @param {string} [URL='http://114.55.101.159:8801'] 接口地址
     * @param {*} [resHandler=null] 返回数据处理函数
     * @param {*} [errorHandler=null] 错误处理函数
     */
    function BtyBaseSdk(URL, resHandler, errorHandler) {
        if (URL === void 0) { URL = 'http://114.55.101.159:8801'; }
        if (resHandler === void 0) { resHandler = null; }
        if (errorHandler === void 0) { errorHandler = null; }
        this.httpProvider = new HttpProvider_1.default(URL, errorHandler);
        this.resHandler = resHandler;
    }
    BtyBaseSdk.toWei = function (amount) {
        var amountInWei = amount * 1e8;
        return amountInWei;
    };
    BtyBaseSdk.fromWei = function (amountInWei) {
        var amount = amountInWei / 1e8;
        return amount;
    };
    BtyBaseSdk.prototype.createTransaction = function (params, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateTransaction', params, url);
    };
    /**
     * @description 构造交易
     * @param {CreateRawTransactionParams} params 构造交易参数
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.createRawTransaction = function (params, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateRawTransaction', params, url);
    };
    /**
     * @description 发送签名后的交易
     * @param {string} unsignTx 未签名的交易
     * @param {string} sign 用私钥对unsigntx签名好的数据
     * @param {string} pubkey 私钥对应的公钥
     * @param {number} [ty=1]
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.sendRawTransaction = function (unsignTx, sign, pubkey, ty, url) {
        if (ty === void 0) { ty = 1; }
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('SendRawTransaction', {
            unsignTx: unsignTx,
            sign: sign,
            pubkey: pubkey,
            ty: ty,
        }, url);
    };
    /**
     * @description 发送交易
     * @param {string} data 签名后的数据
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.sendTransaction = function (data, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('SendTransaction', {
            data: data,
        }, url);
    };
    /**
     * @description 交易签名 SignRawTx
     * @param {SignParams} params 交易签名参数
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.signRawTx = function (params, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('SignRawTx', params, url);
    };
    /**
     * @description 构造并发送不收手续费交易 CreateNoBalanceTransaction（平行链）
     * @param {string} txHex 十六进制交易文本
     * @param {string} payAddr 用于付费的地址，这个地址要在主链上存在，并且里面有比特元用于支付手续费
     * @param {string} [privkey=''] 对应于payAddr的私钥。如果payAddr已经导入到平行链，那么这个私钥可以不传（建议做法是在平行链上导入地址，保证私钥安全）
     * @param {string} [url='']
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.createNoBalanceTransaction = function (txHex, payAddr, privkey, url) {
        if (privkey === void 0) { privkey = ''; }
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateNoBalanceTransaction', {
            txHex: txHex,
            payAddr: payAddr,
            privkey: privkey,
        }, url);
    };
    /**
     * @description 构造交易组 CreateRawTxGroup
     * @param {string[]} txs 十六进制格式交易数组
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.createRawTxGroup = function (txs, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateRawTxGroup', {
            txs: txs,
        }, url);
    };
    /**
     * @description 转账
     * @param {SendToAddressParams} params 参数
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.sendToAddress = function (params, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('SendToAddress', params, url);
    };
    /**
     * @description 解析十六进制交易文本
     * @param {string} txHex 十六进制交易文本
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.decodeRawTransaction = function (txHex, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('DecodeRawTransaction', {
            txHex: txHex,
        });
    };
    /**
     * @description 查询地址余额
     * @param {string[]} addresses 地址数组
     * @param {string} [execer='coins'] coins 查询可用的 BTY ，ticket 查询正在挖矿的 BTY
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getAddrBalance = function (addresses, execer, url) {
        if (execer === void 0) { execer = 'coins'; }
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetBalance', {
            addresses: addresses,
            execer: execer,
        }, url);
    };
    /**
     * @description 查询地址token余额
     * @param {string[]} addresses 地址数组
     * @param {string} execer token 查询可用的余额 ，trade 查询正在交易合约里的token,如果是查询平行链上余额，则需要指定具体平行链的执行器execer,例如：user.p.xxx.token
     * @param {string} tokenSymbol
     * @param {string} version 接口版本
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getTokenBalance = function (addresses, execer, tokenSymbol, version, url) {
        if (url === void 0) { url = ''; }
        var prefix = 'Turingchain';
        if (tools_1.versionCompare(version, '6.0.2') >= 0) {
            prefix = 'token';
        }
        return this.callPromiseAPI('GetTokenBalance', {
            addresses: addresses,
            execer: execer,
            tokenSymbol: tokenSymbol,
        }, url, prefix);
    };
    /**
     * @description 查询地址所有合约地址余额
     * @param {string} addr 地址
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getAllExecBalance = function (addr, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetAllExecBalance', {
            addr: addr,
        }, url);
    };
    /**
     * @description 获取地址相关摘要信息
     * @param {string} addr 地址
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getAddrOverview = function (addr, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetAddrOverview', {
            addr: addr,
        }, url);
    };
    /**
     * @description 根据地址获取交易哈希
     * @param {{addr: string, flag: number, count: number, direction: number, height: number, index: number}}
     * {addr 地址,
     *  flag 0：addr 的所有交易；1：当 addr 为发送方时的交易；2：当 addr 为接收方时的交易,
     *  count, 数量
     *  direction, 0：向后获取 1：向后获取
     *  height, 交易所在的block高度，-1：表示从最新的开始向后取；大于等于0的值，从具体的高度+具体index开始取
     *  index 交易所在block中的索引，取值0--100000}
     * @param {string} [url='']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getTxByAddr = function (_a, url) {
        var addr = _a.addr, flag = _a.flag, count = _a.count, direction = _a.direction, height = _a.height, index = _a.index;
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetTxByAddr', {
            addr: addr,
            flag: flag,
            count: count,
            direction: direction,
            height: height,
            index: index,
        }, url);
    };
    /**
     * @description 根据哈希数组批量获取交易信息
     * @param {string[]} hashes 哈希数组
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getTxByHashes = function (hashes, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetTxByHashes', {
            hashes: hashes,
        }, url).then(function (res) {
            // 给返回的交易详情增加hash属性
            if (res && res.result && res.result.txs) {
                for (var i = 0; i < res.result.txs.length; i++) {
                    if (res.result.txs[i]) {
                        res.result.txs[i]['txHash'] = hashes[i];
                    }
                }
            }
            return res;
        });
    };
    /**
     * @description 根据地址获取交易信息
     * @param {{addr: string, flag: number, count: number, direction: number, height: number, index: number}}
     * {addr 地址,
     *  flag 0：addr 的所有交易；1：当 addr 为发送方时的交易；2：当 addr 为接收方时的交易,
     *  count, 数量
     *  direction, 0：向后获取 1：向后获取
     *  height, 交易所在的block高度，-1：表示从最新的开始向后取；大于等于0的值，从具体的高度+具体index开始取
     *  index 交易所在block中的索引，取值0--100000}
     * @param {string} [url='']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getAddrTx = function (_a, url) {
        var _this = this;
        var addr = _a.addr, flag = _a.flag, count = _a.count, direction = _a.direction, height = _a.height, index = _a.index;
        if (url === void 0) { url = ''; }
        return this.getTxByAddr({ addr: addr, flag: flag, count: count, direction: direction, height: height, index: index }, url)
            .then(function (res) {
            if (res.error) {
                return [];
            }
            var hashArr = res.result.txInfos;
            var hashStringArr = [];
            var i = 0;
            if (direction === 0) {
                for (i = 0; i < hashArr.length; i++) {
                    hashStringArr.splice(i, 1, hashArr[i].hash);
                }
            }
            else {
                for (i = hashArr.length; i > 0; i--) {
                    hashStringArr.splice(i, 1, hashArr[i - 1].hash);
                }
            }
            return hashStringArr;
        }).then(function (hashes) {
            return _this.getTxByHashes(hashes, url);
        });
    };
    /**
     * @description 根据哈希获取交易的字符串
     * @param {string} hash 交易哈希
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getHexTxByHash = function (hash, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetHexTxByHash', {
            hash: hash,
        }, url);
    };
    /**
     * @description 将合约名转化成Turingchain中的实际地址
     * @param {string} execname 执行器名称
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.convertExectoAddr = function (execname, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('ConvertExectoAddr', {
            execname: execname,
        }, url);
    };
    /**
     * @description 根据哈希查询交易信息
     * @param {string} hash 交易哈希
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.queryTransaction = function (hash, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('QueryTransaction', {
            hash: hash,
        }, url);
    };
    /**
     * @description 查询所有创建成功的token
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.queryAllTokens = function (url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'token',
            funcName: 'GetTokens',
            payload: {
                queryAll: true,
                status: 1,
            },
        }, url);
    };
    /**
     * @description 查询地址下的token/trace合约下的token资产
     * @param {string} address 查询的地址
     * @param {string} execer token 或 trade
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getAddrTokenAssets = function (address, execer, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'token',
            funcName: 'GetAccountTokenAssets',
            payload: {
                address: address,
                execer: execer,
            },
        }, url);
    };
    /**
     * @description 查询token相关的交易
     * @param {TokenTxParams} params 查询参数
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getTxByToken = function (params, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'token',
            funcName: 'GetTxByToken',
            payload: params,
        }, url);
    };
    /**
     * @description 查询指定创建成功的token
     * @param {string} tokenSymbol 指定token的symbol
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getTokenInfo = function (tokenSymbol, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'token',
            funcName: 'GetTokenInfo',
            payload: {
                data: tokenSymbol,
            },
        }, url);
    };
    /**
     * @description 获取版本
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.version = function (url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Version', {}, url);
    };
    /**
     * @description 获取区间区块
     * @param {number} start 区块开始高度
     * @param {number} end 区块结束高度
     * @param {boolean} isDetail 是否获取详情
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getBlocks = function (start, end, isDetail, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetBlocks', {
            start: start,
            end: end,
            isDetail: isDetail,
        }, url);
    };
    /**
     * @description 获取最新的区块头
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getLastHeader = function (url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetLastHeader', {}, url);
    };
    /**
     * @description 获取区间区块头
     * @param {number} start 区块开始高度
     * @param {number} end 区块结束高度
     * @param {boolean} isDetail 是否获取详情
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getHeaders = function (start, end, isDetail, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetHeaders', {
            start: start,
            end: end,
            isDetail: isDetail,
        }, url);
    };
    /**
     * @description  获取区块的 hash 值
     * @param {number} height 高度
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getBlockHash = function (height, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetBlockHash', {
            height: height,
        }, url);
    };
    /**
     * @description 获取区块的详细信息
     * @param {string} hash 区块哈希
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getBlockOverview = function (hash, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetBlockOverview', {
            hash: hash,
        }, url);
    };
    /**
     * @description 通过区块哈希获取区块信息
     * @param {string[]} hashes 区块哈希列表
     * @param {boolean} disableDetail 是否打印区块详细信息
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getBlockByHashes = function (hashes, disableDetail, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetBlockByHashes', {
            hashes: hashes,
            disableDetail: disableDetail,
        }, url);
    };
    /**
     * @description 获取区块的序列信息
     * @param {number} start 开始区块高度
     * @param {number} end 结束区块高度
     * @param {boolean} isDetail 是否打印区块详细信息
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getBlockSequences = function (start, end, isDetail, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetBlockSequences', {
            start: start,
            end: end,
            isDetail: isDetail,
        }, url);
    };
    /**
     * @description 获取最新区块的序列号
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getLastBlockSequence = function (url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetBlockSequences', {}, url);
    };
    /**
     * @description 增加区块序列号变更回调
     * @param {string} name 回调名称，长度不能超过128,
     * @param {string} URL 序列号变化通知的URL，长度不能超过1024；当name相同，URL为空时取消通知
     * @param {string} encode 数据编码方式；json 或者 proto
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.addSeqCallBack = function (name, URL, encode, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('AddSeqCallBack', {
            name: name,
            URL: URL,
            encode: encode,
        }, url);
    };
    /**
     * @description 列举区块序列号回调
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.listSeqCallBack = function (url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('ListSeqCallBack', {}, url);
    };
    /**
     * @description 获取某回调最新序列号的值
     * @param {string} data 回调名
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getSeqCallBackLastNum = function (data, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetSeqCallBackLastNum', {
            data: data,
        }, url);
    };
    /**
     * @description 获取远程节点列表
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getPeerInfo = function (url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetPeerInfo', {}, url);
    };
    /**
     * @description 查询节点状态
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getNetInfo = function (url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetNetInfo', {}, url);
    };
    /**
     * @description 查询时间状态
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.getTimeStatus = function (url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetTimeStatus', {}, url);
    };
    /**
     * @description 查询同步状态
     * @returns {Promise<any>}
     * @memberof BtyBaseSdk
     */
    BtyBaseSdk.prototype.isSync = function (url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('IsSync', {}, url);
    };
    /**
     * @description 获取 GetMempool
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getMempool = function (url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('GetMempool', {}, url);
    };
    /**
     * @description 生成预创建token 的交易（未签名）
     * @param {CreateRawTokenParams} params 参数
     * @param {string} version 接口版本
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.createRawTokenPreCreateTx = function (params, version, url) {
        if (url === void 0) { url = ''; }
        var prefix = 'Turingchain';
        if (tools_1.versionCompare(version, '6.0.2') >= 0) {
            prefix = 'token';
        }
        return this.callPromiseAPI('CreateRawTokenPreCreateTx', params, url, prefix);
    };
    /**
     * @description 生成完成创建token 的交易（未签名）
     * @param {string} symbol token标记符，最大长度是16个字符，且必须为大写字符
     * @param {string} owner token拥有者地址
     * @param {string} version 接口版本
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.createRawTokenFinishTx = function (symbol, owner, version, url) {
        if (url === void 0) { url = ''; }
        var prefix = 'Turingchain';
        if (tools_1.versionCompare(version, '6.0.2') >= 0) {
            prefix = 'token';
        }
        return this.callPromiseAPI('CreateRawTokenFinishTx', {
            symbol: symbol,
            owner: owner,
        }, url, prefix);
    };
    /**
     * @description 生成撤销创建token 的交易（未签名）
     * @param {string} symbol token标记符，最大长度是16个字符，且必须为大写字符
     * @param {string} owner token拥有者地址
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.createRawTokenRevokeTx = function (symbol, owner, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateRawTokenRevokeTx', {
            symbol: symbol,
            owner: owner,
        }, url, 'token');
    };
    /**
     * @description 查询地址对应的买单
     * @param {string} addr 买单持有人
     * @param {string[]} [token=[]] 具体的token的标识符，可以是多个
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getOnesBuyOrder = function (addr, token, url) {
        if (token === void 0) { token = []; }
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'trade',
            funcName: 'GetOnesBuyOrder',
            payload: {
                addr: addr,
                token: token,
            },
        }, url);
    };
    /**
     * @description 分状态查询地址的买单
     * @param {string} addr 买单持有人
     * @param {number} status 买单状态
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getOnesBuyOrderWithStatus = function (addr, status, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'trade',
            funcName: 'GetOnesBuyOrderWithStatus',
            payload: {
                addr: addr,
                status: status,
            },
        }, url);
    };
    /**
     * @description 显示一个token 指定数量的买单
     * @param {*} params 查询参数
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getTokenBuyOrderByStatus = function (params, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'trade',
            funcName: 'GetTokenBuyOrderByStatus',
            payload: params,
        }, url);
    };
    /**
     * @description 显示指定token出售者的一个或多个token 或 不指定token 的卖单
     * @param {string} addr 卖单持有人
     * @param {string[]} [token=[]] 具体的token的标识符，可以是多个， 或不指定
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getOnesSellOrder = function (addr, token, url) {
        if (token === void 0) { token = []; }
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'trade',
            funcName: 'GetOnesSellOrder',
            payload: {
                addr: addr,
                token: token,
            },
        }, url);
    };
    /**
     * @description 显示指定状态下的某地址卖单
     * @param {string} addr 买单持有人
     * @param {number} status 买单状态
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getAllSellOrderWithStatus = function (addr, status, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'trade',
            funcName: 'GetAllSellOrderWithStatus',
            payload: {
                addr: addr,
                status: status,
            },
        }, url);
    };
    /**
     * @description 显示一个token 指定数量的卖单
     * @param {*} params 查询参数
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getTokenSellOrderByStatus = function (params, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'trade',
            funcName: 'GetTokenSellOrderByStatus',
            payload: params,
        }, url);
    };
    /**
     * @description 生成 卖出token的交易（未签名）
     * @param {*} params 查询参数
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.createRawTradeSellTx = function (params, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateRawTradeSellTx', params, url, 'trade');
    };
    /**
     * @description 生成买入指定卖单卖出的token的交易（未签名）
     * @param {string} sellID 卖单id
     * @param {number} boardlotCnt 购买数量，单位手
     * @param {number} fee 交易的手续费
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.createRawTradeBuyTx = function (sellID, boardlotCnt, fee, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateRawTradeBuyTx', {
            sellID: sellID,
            boardlotCnt: boardlotCnt,
            fee: fee,
        }, url, 'trade');
    };
    /**
     * @description 生成撤销卖出token(卖单)的交易（未签名）
     * @param {string} sellID 卖单id
     * @param {number} fee 交易的手续费
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.createRawTradeRevokeTx = function (sellID, fee, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateRawTradeRevokeTx', {
            sellID: sellID,
            fee: fee,
        }, url, 'trade');
    };
    /**
     * @description 生成 买入token的交易（未签名）
     * @param {*} params 参数
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.createRawTradeBuyLimitTx = function (params, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateRawTradeBuyLimitTx', params, url, 'trade');
    };
    /**
     * @description 生成卖出指定买单的token的交易（未签名）
     * @param {string} buyID 买单id
     * @param {number} boardlotCnt 购买数量，单位手
     * @param {number} fee 交易的手续费
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.createRawTradeSellMarketTx = function (buyID, boardlotCnt, fee, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateRawTradeSellMarketTx', {
            buyID: buyID,
            boardlotCnt: boardlotCnt,
            fee: fee,
        }, url, 'trade');
    };
    /**
     * @description 生成撤销买入token(买单)的交易（未签名）
     * @param {string} buyID 买单id
     * @param {number} fee 交易的手续费
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.createRawTradeRevokeBuyTx = function (buyID, fee, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('CreateRawTradeRevokeBuyTx', {
            buyID: buyID,
            fee: fee,
        }, url, 'trade');
    };
    /**
     * @description 根据状态分页列出某地址的订单（包括买单卖单）
     * @param {*} params 查询参数
     * @param {string} [url=''] 接口地址
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.GetOnesOrderWithStatus = function (params, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('Query', {
            execer: 'trade',
            funcName: 'GetOnesOrderWithStatus',
            payload: params,
        }, url);
    };
    /**
     * @description 统计手续费
     * @param {string[]} keys 是 TotalFeeKey: 开始，后面跟原始的BlockHash
     * @param {string} [url='']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.queryTotalFee = function (keys, url) {
        if (url === void 0) { url = ''; }
        return this.callPromiseAPI('QueryTotalFee', {
            keys: keys,
        }, url);
    };
    // 钱包接口 start/////////////////////////
    /**
     * @description 钱包加锁 Lock
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.lock = function (url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('Lock', {}, url);
    };
    /**
     * @description 钱包解锁 Unlock
     * @param {string} passwd 密码
     * @param {boolean} walletorticket true，只解锁ticket买票功能，false：解锁整个钱包
     * @param {number} [timeout=0] 解锁时间，默认 0，表示永远解锁；非 0 值，表示超时之后继续锁住钱包，单位：秒。
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.unlock = function (passwd, walletorticket, timeout, url) {
        if (timeout === void 0) { timeout = 0; }
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('UnLock', {
            passwd: passwd,
            walletorticket: walletorticket,
            timeout: timeout,
        }, url);
    };
    /**
     * @description 设置/修改钱包密码 SetPasswd
     * @param {string} oldPass 第一次设置密码时，oldPass 为空
     * @param {string} newPass 待设置的新密码
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.setPasswd = function (oldPass, newPass, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('SetPasswd', {
            oldPass: oldPass,
            newPass: newPass,
        }, url);
    };
    /**
     * @description 设置账户标签 SetLabl
     * @param {string} addr 账户地址
     * @param {string} label 待设置的账户标签
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.setLabl = function (addr, label, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('SetLabl', {
            addr: addr,
            label: label,
        }, url);
    };
    /**
     * @description 创建账户 NewAccount
     * @param {string} label 待设置的账户标签
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.newAccount = function (label, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('NewAccount', {
            label: label,
        }, url);
    };
    /**
     * @description 获取账户列表 GetAccounts
     * @param {boolean} [withoutBalance=false] 不填或false， 将返回account 的帐号信息。 为true 则返回 label 和 addr 信息， 其他信息为 0
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getAccounts = function (withoutBalance, url) {
        if (withoutBalance === void 0) { withoutBalance = false; }
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('GetAccounts', {
            withoutBalance: withoutBalance,
        }, url);
    };
    /**
     * @description 合并账户余额 MergeBalance
     * @param {string} to 合并钱包上的所有余额到一个账户地址
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.MergeBalance = function (to, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('MergeBalance', {
            to: to,
        }, url);
    };
    /**
     * @description 导入私钥 ImportPrivKey
     * @param {string} privkey 私钥
     * @param {string} label 导入账户标签
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.importPrivKey = function (privkey, label, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('ImportPrivKey', {
            privkey: privkey,
            label: label,
        }, url);
    };
    /**
     * @description 导出私钥 dumpprivkey
     * @param {string} addr 待导出私钥的账户地址
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.dumpPrivkey = function (addr, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('DumpPrivkey', {
            addr: addr,
        }, url);
    };
    /**
     * @description 设置交易费用 SetTxFee
     * @param {number} amount 手续费
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.setTxFee = function (amount, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('SetTxFee', {
            amount: amount,
        }, url);
    };
    /**
     * @description 获取钱包交易列表 WalletTransactionList
     * @param {string} fromTx Sprintf(“%018d”, height*100000 + index)，表示从高度 height 中的 index 开始获取交易列表；第一次传参为空，获取最新的交易
     * @param {number} count 获取交易列表的个数
     * @param {number} direction 查找方式；0，上一页；1，下一页
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.walletTxList = function (fromTx, count, direction, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('WalletTxList', {
            fromTx: fromTx,
            count: count,
            direction: direction,
        }, url);
    };
    /**
     * @description 生成随机的seed GenSeed
     * @param {number} lang lang=0:英语，lang=1:简体汉字
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.genSeed = function (lang, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('GenSeed', {
            lang: lang,
        }, url);
    };
    /**
     * @description 保存seed并用密码加密 SaveSeed
     * @param {string} seed 种子要求16个单词或者汉字,参考genseed输出格式,需要空格隔开
     * @param {string} passwd 加密密码
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.saveSeed = function (seed, passwd, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('SaveSeed', {
            seed: seed,
            passwd: passwd,
        }, url);
    };
    /**
     * @description 通过钱包密码获取钱包的seed原文 GetSeed
     * @param {string} passwd 加密密码
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getSeed = function (passwd, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('GetSeed', {
            passwd: passwd,
        }, url);
    };
    /**
     * @description 创建绑定挖矿交易 CreateBindMiner
     * @param {{bindAddr: string, originAddr: string, amount: number, checkBalance: boolean}} param
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.createBindMiner = function (param, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('CreateBindMiner', param, url, 'ticket');
    };
    /**
     * @description 获取Ticket的数量 GetTicketCount
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getTicketCount = function (url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('GetTicketCount', {}, url, 'ticket');
    };
    /**
     * @description 获取钱包状态 GetWalletStatus
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.getWalletStatus = function (url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('GetWalletStatus', {}, url);
    };
    /**
     * @description 设置自动挖矿
     * @param {number} flag 标识符，1 为开启自动挖矿，0 为关闭自动挖矿。
     * @param {string} [url='http://localhost:8801']
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.setAutoMining = function (flag, url) {
        if (url === void 0) { url = 'http://localhost:8801'; }
        return this.callPromiseAPI('SetAutoMining', {
            flag: flag,
        }, url, 'ticket');
    };
    // 钱包接口 end/////////////////////////
    /**
     * @description 请求Turingchain接口
     * @param {string} apiName 接口名
     * @param {*} [params={}] 请求参数
     * @param {string} [url=''] 接口地址
     * @param {string} [prefix='Turingchain'] method前缀
     * @param {string} [method=''] method全称填写这个参数后无视 apiName和 prefix
     * @returns {Promise<any>}
     */
    BtyBaseSdk.prototype.callPromiseAPI = function (apiName, params, url, prefix, method) {
        var _this = this;
        if (params === void 0) { params = {}; }
        if (url === void 0) { url = ''; }
        if (prefix === void 0) { prefix = 'Turingchain'; }
        if (method === void 0) { method = ''; }
        return this.httpProvider.doFetch({
            url: url,
            postdata: {
                id: +new Date(),
                jsonrpc: '2.0',
                method: method || prefix + "." + apiName,
                params: [params],
            },
        }).then(function (res) {
            if (_this.resHandler) {
                return _this.resHandler(res);
            }
            else {
                return res;
            }
        });
    };
    return BtyBaseSdk;
}());
export default BtyBaseSdk;
// exports.default = BtyBaseSdk;
//# sourceMappingURL=index.js.map
