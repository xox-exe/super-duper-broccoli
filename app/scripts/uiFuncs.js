'use strict';
var uiFuncs = function() {}
uiFuncs.getTxData = function($scope) {
    return {
        to: $scope.tx.to,
        value: $scope.tx.value,
        unit: $scope.tx.unit,
        gasLimit: $scope.tx.gasLimit,
        data: $scope.tx.data,
        from: $scope.wallet.getAddressString(),
        privKey: $scope.wallet.privKey ? $scope.wallet.getPrivateKeyString() : '',
        path: $scope.wallet.getPath(),
        hwType: $scope.wallet.getHWType(),
        hwTransport: $scope.wallet.getHWTransport()
    };
}
uiFuncs.isTxDataValid = function(txData) {
    if (txData.to != "0xCONTRACT" && !ethFuncs.validateEtherAddress(txData.to)) throw globalFuncs.errorMsgs[5];
    else if (!globalFuncs.isNumeric(txData.value) || parseFloat(txData.value) < 0) throw globalFuncs.errorMsgs[0];
    else if (!globalFuncs.isNumeric(txData.gasLimit) || parseFloat(txData.gasLimit) <= 0) throw globalFuncs.errorMsgs[8];
    else if (!ethFuncs.validateHexString(txData.data)) throw globalFuncs.errorMsgs[9];
    if (txData.to == "0xCONTRACT") txData.to = '';
}
uiFuncs.signTxTrezor = function(rawTx, txData, callback) {
    var localCallback = function(result) {
        if (!result.success) {
            if (callback !== undefined) {
                callback({
                    isError: true,
                    error: result.error
                });
            }
            return;
        }

        rawTx.v = "0x" + ethFuncs.decimalToHex(result.v);
        rawTx.r = "0x" + result.r;
        rawTx.s = "0x" + result.s;
        var eTx = new ethUtil.Tx(rawTx);
        rawTx.rawTx = JSON.stringify(rawTx);
        rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
        rawTx.isError = false;
        if (callback !== undefined) callback(rawTx);
    }

    TrezorConnect.signEthereumTx(
        txData.path,
        ethFuncs.getNakedAddress(rawTx.nonce),
        ethFuncs.getNakedAddress(rawTx.gasPrice),
        ethFuncs.getNakedAddress(rawTx.gasLimit),
        ethFuncs.getNakedAddress(rawTx.to),
        ethFuncs.getNakedAddress(rawTx.value),
        ethFuncs.getNakedAddress(rawTx.data),
        rawTx.chainId,
        localCallback
    );
}
uiFuncs.signTxLedger = function(app, eTx, rawTx, txData, old, callback) {
    eTx.raw[6] = Buffer.from([rawTx.chainId]);
    eTx.raw[7] = eTx.raw[8] = 0;
    var toHash = old ? eTx.raw.slice(0, 6) : eTx.raw;
    var txToSign = ethUtil.rlp.encode(toHash);
    var localCallback = function(result, error) {
        if (typeof error != "undefined") {
            error = error.errorCode ? u2f.getErrorByCode(error.errorCode) : error;
            if (callback !== undefined) callback({
                isError: true,
                error: error
            });
            return;
        }
        rawTx.v = "0x" + result['v'];
        rawTx.r = "0x" + result['r'];
        rawTx.s = "0x" + result['s'];
        eTx = new ethUtil.Tx(rawTx);
        rawTx.rawTx = JSON.stringify(rawTx);
        rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
        rawTx.isError = false;
        if (callback !== undefined) callback(rawTx);
    }
    app.signTransaction(txData.path, txToSign.toString('hex'), localCallback);
}
uiFuncs.trezorUnlockCallback = function(txData, callback) {
    TrezorConnect.open(function(error) {
        if (error) {
            if (callback !== undefined) callback({
                isError: true,
                error: error
            });
        } else {
            txData.trezorUnlocked = true;
            uiFuncs.generateTx(txData, callback);
        }
    });
}
uiFuncs.generateTx = function(txData, callback) {
    if ((typeof txData.hwType != "undefined") && (txData.hwType == "trezor") && !txData.trezorUnlocked) {
        uiFuncs.trezorUnlockCallback(txData, callback);
        return;
    }
    try {
        uiFuncs.isTxDataValid(txData);
        var genTxWithInfo = function(data) {
            var rawTx = {
                nonce: ethFuncs.sanitizeHex(data.nonce),
                gasPrice: data.isOffline ? ethFuncs.sanitizeHex(data.gasprice) : ethFuncs.sanitizeHex(ethFuncs.addTinyMoreToGas(data.gasprice)),
                gasLimit: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(txData.gasLimit)),
                to: ethFuncs.sanitizeHex(txData.to),
                value: ethFuncs.sanitizeHex(ethFuncs.decimalToHex(etherUnits.toWei(txData.value, txData.unit))),
                data: ethFuncs.sanitizeHex(txData.data)
            }
            if (ajaxReq.eip155) rawTx.chainId = ajaxReq.chainId;
            var eTx = new ethUtil.Tx(rawTx);
            if ((typeof txData.hwType != "undefined") && (txData.hwType == "ledger")) {
                var app = new ledgerEth(txData.hwTransport);
                var EIP155Supported = false;
                var localCallback = function(result, error) {
                    if (typeof error != "undefined") {
                        if (callback !== undefined) callback({
                            isError: true,
                            error: error
                        });
                        return;
                    }
                    var splitVersion = result['version'].split('.');
                    if (parseInt(splitVersion[0]) > 1) {
                        EIP155Supported = true;
                    } else
                    if (parseInt(splitVersion[1]) > 0) {
                        EIP155Supported = true;
                    } else
                    if (parseInt(splitVersion[2]) > 2) {
                        EIP155Supported = true;
                    }
                    uiFuncs.signTxLedger(app, eTx, rawTx, txData, !EIP155Supported, callback);
                }
                app.getAppConfiguration(localCallback);
            } else if ((typeof txData.hwType != "undefined") && (txData.hwType == "trezor")) {
                uiFuncs.signTxTrezor(rawTx, txData, callback);
            } else {
                eTx.sign(new Buffer(txData.privKey, 'hex'));
                rawTx.rawTx = JSON.stringify(rawTx);
                rawTx.signedTx = '0x' + eTx.serialize().toString('hex');
                rawTx.isError = false;
                if (callback !== undefined) callback(rawTx);
            }
        }
        if (txData.nonce || txData.gasPrice) {
            var data = {
                nonce: txData.nonce,
                gasprice: txData.gasPrice
            }
            data.isOffline = txData.isOffline ? txData.isOffline : false;
            genTxWithInfo(data);
        } else {
            ajaxReq.getTransactionData(txData.from, function(data) {
                if (data.error && callback !== undefined) {
                    callback({
                        isError: true,
                        error: e
                    });
                    return;
                } else {
                    data = data.data;
                    data.isOffline = txData.isOffline ? txData.isOffline : false;
                    genTxWithInfo(data);
                }
            });
        }
    } catch (e) {
        if (callback !== undefined) callback({
            isError: true,
            error: e
        });
    }
}
uiFuncs.sendTx = function(signedTx, callback) {
    ajaxReq.sendRawTx(signedTx, function(data) {
        var resp = {};
        if (data.error) {
            resp = {
                isError: true,
                error: data.msg
            };
        } else {
            resp = {
                isError: false,
                data: data.data
            };
        }
        if (callback !== undefined) callback(resp);
    });
}
uiFuncs.transferAllBalance = function(fromAdd, gasLimit, callback) {
    try {
        ajaxReq.getTransactionData(fromAdd, function(data) {
            if (data.error) throw data.msg;
            data = data.data;
            var gasPrice = new BigNumber(ethFuncs.sanitizeHex(ethFuncs.addTinyMoreToGas(data.gasprice))).times(gasLimit);
            var maxVal = new BigNumber(data.balance).minus(gasPrice);
            maxVal = etherUnits.toEther(maxVal, 'wei') < 0 ? 0 : etherUnits.toEther(maxVal, 'wei');
            if (callback !== undefined) callback({
                isError: false,
                unit: "ether",
                value: maxVal
            });
        });
    } catch (e) {
        if (callback !== undefined) callback({
            isError: true,
            error: e
        });
    }
}
uiFuncs.notifier = {
    show: false,
    isDanger: false,
    close: function() {
        this.show = false;
        this.isDanger = false;
        this.message = "";
        if (!this.scope.$$phase) this.scope.$apply()
    },
    open: function() {
        this.show = true;
        if (!this.scope.$$phase) this.scope.$apply();
    },
    class: '',
    message: '',
    timer: null,
    sce: null,
    scope: null,
    overrideMsg: function(msg) {
        console.log(msg)
        return globalFuncs.getEthNodeMsg(msg);
    },
    warning: function(msg) {
        this.setClassAndOpen("alert-warning", msg);
    },
    info: function(msg) {
        this.setClassAndOpen("", msg);
        this.setTimer();
    },
    danger: function(msg) {
        msg = msg.message ? msg.message : msg;
        msg = this.overrideMsg(msg);
        this.isDanger = true;
        this.setClassAndOpen("alert-danger", msg);
        this.cancelTimer();
    },
    success: function(msg) {
        this.setClassAndOpen("alert-success", msg);
    },
    setClassAndOpen: function(_class, msg) {
        this.class = _class;
        var _temp = this.message != "" ? this.message + "</br>" : "";
        this.message = msg.message ? this.sce.trustAsHtml(msg.message) : this.sce.trustAsHtml(msg);
        this.message = _temp + this.message;
        this.open();
    },
    setTimer: function() {
        var _this = this;
        if (_this.isDanger) return;
        clearTimeout(_this.timer);
        _this.timer = setTimeout(function() {
            _this.show = false;
            _this.message = "";
            if (!_this.scope.$$phase) _this.scope.$apply();
        }, 5000);
    },
    cancelTimer: function() {
        var _this = this;
        clearTimeout(_this.timer);
    }
}
module.exports = uiFuncs;
