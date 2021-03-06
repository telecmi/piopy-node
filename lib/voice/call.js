'use strict';

var _index = require('../underscore/index');

var _index2 = _interopRequireDefault(_index);

var _hold = require('./hold');

var _hold2 = _interopRequireDefault(_hold);

var _hangup = require('./hangup');

var _hangup2 = _interopRequireDefault(_hangup);

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var voice = { host: "https://piopiy.telecmi.com", path: "/v1/make_call" };
var credentials = {};

exports.setup = function (appid, secret) {
    credentials.appid = appid;
    credentials.secret = secret;
};

exports.make = function (to, from, answer_url, duration) {
    return new Promise(function (solved, rejected) {

        if (_index2.default.isNumber(to) && _index2.default.isNumber(from) && _index2.default.isUrl(answer_url)) {

            var options = {
                uri: voice.host + voice.path,
                method: 'POST',
                json: {
                    "appid": credentials.appid,
                    "secret": credentials.secret,
                    "from": from,
                    "duration": duration,
                    "answer_url": answer_url,
                    "to": to
                }
            };

            (0, _request2.default)(options, function (error, res, body) {
                if (!error && res.statusCode == 200) {
                    solved(body);
                } else {
                    solved(error);
                }
            });
        } else {
            rejected('to,from and answer_url type error');
        }
    });
};

exports.hold = function (cmiuuid) {
    return _hold2.default.hold(credentials.appid, credentials.secret, cmiuuid);
};

exports.unhold = function (cmiuuid) {
    return _hold2.default.unhold(credentials.appid, credentials.secret, cmiuuid);
};

exports.toggle = function (cmiuuid) {
    return _hold2.default.toggle(credentials.appid, credentials.secret, cmiuuid);
};

exports.hangup = function (cmiuuid) {
    return _hangup2.default.hangup(credentials.appid, credentials.secret, cmiuuid);
};