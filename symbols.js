"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _networks = require("./networks.js");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function renderBackgroundSymbol() {
  return _react.default.createElement("symbol", {
    id: "background",
    viewBox: "0 0 64 64"
  }, _react.default.createElement("g", {
    className: "social-background"
  }, _react.default.createElement("circle", {
    cx: "32",
    cy: "32",
    r: "31"
  })));
}

function renderSymbols(props) {
  return props.networks.map(function (key) {
    return [_react.default.createElement("symbol", {
      id: "".concat(key, "-icon"),
      viewBox: "0 0 64 64"
    }, _react.default.createElement("g", {
      className: "social-icon"
    }, _react.default.createElement("path", {
      d: (0, _networks.iconFor)(key)
    }))), _react.default.createElement("symbol", {
      id: "".concat(key, "-mask"),
      viewBox: "0 0 64 64"
    }, _react.default.createElement("g", {
      className: "social-mask"
    }, _react.default.createElement("path", {
      d: (0, _networks.maskFor)(key)
    })))];
  });
}

function Symbols(props) {
  return _react.default.createElement("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    id: "social-symbols",
    version: "1.1"
  }, renderBackgroundSymbol(), renderSymbols(props));
}

Symbols.propTypes = {
  networks: _react.PropTypes.arrayOf(_react.PropTypes.string).isRequired
};
var _default = Symbols;
exports.default = _default;