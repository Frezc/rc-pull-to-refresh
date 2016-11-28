'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PullToRefresh = require('./PullToRefresh');

var _PullToRefresh2 = _interopRequireDefault(_PullToRefresh);

var _ArrowUp = require('./ArrowUp');

var _ArrowUp2 = _interopRequireDefault(_ArrowUp);

var _Refreshing = require('./Refreshing');

var _Refreshing2 = _interopRequireDefault(_Refreshing);

require('./sptr.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.PureComponent || _react2.default.Component;

var SimplePTR = function (_Component) {
  _inherits(SimplePTR, _Component);

  function SimplePTR() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, SimplePTR);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = SimplePTR.__proto__ || Object.getPrototypeOf(SimplePTR)).call.apply(_ref, [this].concat(args))), _this), _this.renderHeader = function (_ref2) {
      var loading = _ref2.loading,
          canRefresh = _ref2.canRefresh,
          offset = _ref2.offset;

      if (loading) {
        return _react2.default.createElement(
          'div',
          { className: 'sptr-header' },
          _react2.default.createElement(_Refreshing2.default, null)
        );
      } else {
        return _react2.default.createElement(
          'div',
          { className: 'sptr-header' },
          canRefresh ? _react2.default.createElement(_ArrowUp2.default, { className: 'rotate-arrow' }) : _react2.default.createElement(_ArrowUp2.default, { className: 'rotate-arrow reverse' })
        );
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(SimplePTR, [{
    key: 'render',
    value: function render() {
      return _react2.default.createElement(_PullToRefresh2.default, _extends({}, this.props, {
        distanceToRefresh: 60,
        header: {
          height: 60,
          render: this.renderHeader
        }
      }));
    }
  }]);

  return SimplePTR;
}(Component);

SimplePTR.propTypes = {
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  loading: _react.PropTypes.bool.isRequired,
  onRefresh: _react.PropTypes.func.isRequired,
  resistance: _react.PropTypes.number,
  onEndReachedThreshold: _react.PropTypes.number,
  onEndReached: _react.PropTypes.func
};
exports.default = SimplePTR;