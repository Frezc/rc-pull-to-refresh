'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./refreshing.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Refreshing(_ref) {
  var style = _ref.style,
      className = _ref.className;

  return _react2.default.createElement(
    'svg',
    {
      style: style,
      className: 'refreshing ' + className,
      viewBox: '0 0 22 22'
    },
    _react2.default.createElement('path', {
      style: styles.common,
      d: 'M12.398,1.098l0.864-0.864C9.75-0.501,5.948,0.495,3.222,3.222\r C-0.591,7.035-1.02,12.95,1.936,17.236l-1.543,1.542l3.889,0.354l-0.353-3.889l-1.273,1.273C0.084,12.633,0.508,7.35,3.929,3.929\r C6.238,1.62,9.396,0.676,12.398,1.098z' }),
    _react2.default.createElement('path', {
      style: styles.common,
      d: 'M20.9,2.515L17.01,2.161l0.354,3.889l1.379-1.379\r c3.218,3.928,2.994,9.734-0.672,13.4c-2.608,2.608-6.299,3.475-9.626,2.599l-0.806,0.806c3.798,1.215,8.126,0.316,11.14-2.698\r c4.057-4.057,4.282-10.496,0.675-14.818L20.9,2.515z' })
  );
}

var styles = {
  common: {
    fillRule: 'evenodd',
    clipRule: 'evenodd'
  }
};

exports.default = Refreshing;