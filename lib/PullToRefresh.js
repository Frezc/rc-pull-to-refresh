'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

require('./ptr.css');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Component = _react2.default.PureComponent || _react2.default.Component;

var PullToRefresh = function (_Component) {
  _inherits(PullToRefresh, _Component);

  function PullToRefresh() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, PullToRefresh);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = PullToRefresh.__proto__ || Object.getPrototypeOf(PullToRefresh)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      pullOffset: 0,
      disableTrans: false
    }, _this.lastY = 0, _this.handleTouchStart = function (e) {
      if (_this.props.loading) return;
      _this.lastY = e.changedTouches[0].pageY;
      _this.setState({ disableTrans: true });
    }, _this.handleTouchMove = function (e) {
      if (_this.props.loading) return;
      var contentEl = _this.refs.content;
      var touch = e.changedTouches[0];
      if (contentEl.scrollTop <= 0) {
        _this.setState(function (prevState) {
          return {
            pullOffset: Math.max(prevState.pullOffset + (touch.pageY - _this.lastY) * (1 / _this.props.resistance), 0)
          };
        }, function () {
          _this.lastY = touch.pageY;
        });
      } else {
        _this.lastY = touch.pageY;
      }
    }, _this.handleTouchEnd = function (e) {
      if (_this.props.loading) return;
      var _this$props = _this.props,
          distanceToRefresh = _this$props.distanceToRefresh,
          onRefresh = _this$props.onRefresh;

      if (_this.state.pullOffset >= distanceToRefresh) {
        onRefresh && onRefresh();
      }
      _this.setState({
        pullOffset: 0,
        disableTrans: false
      });
    }, _this.handleScroll = function (e) {
      var _this$props2 = _this.props,
          onEndReachedThreshold = _this$props2.onEndReachedThreshold,
          onEndReached = _this$props2.onEndReached;

      if (onEndReached) {
        var _e$target = e.target,
            scrollHeight = _e$target.scrollHeight,
            clientHeight = _e$target.clientHeight,
            scrollTop = _e$target.scrollTop;

        if (Math.round(scrollTop) + Math.round(clientHeight) + onEndReachedThreshold >= Math.round(scrollHeight)) {
          onEndReached();
        }
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(PullToRefresh, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          children = _props.children,
          className = _props.className,
          style = _props.style,
          header = _props.header,
          distanceToRefresh = _props.distanceToRefresh,
          loading = _props.loading,
          onScroll = _props.onScroll;
      var _state = this.state,
          pullOffset = _state.pullOffset,
          disableTrans = _state.disableTrans;

      var displayOffset = loading ? header.height : pullOffset;

      var h = header.render({
        loading: loading,
        offset: pullOffset,
        canRefresh: pullOffset >= distanceToRefresh
      });
      return _react2.default.createElement(
        'div',
        {
          className: 'pull-to-refresh ' + className,
          style: style,
          onTouchStart: this.handleTouchStart,
          onTouchMove: this.handleTouchMove,
          onTouchEnd: this.handleTouchEnd
        },
        _react2.default.createElement(
          'div',
          {
            className: 'ptr-header ' + (disableTrans ? 'disableTrans' : ''),
            style: {
              transform: 'translate3d(0,' + (displayOffset - header.height) + 'px,0)',
              WebkitTransform: 'translate3d(0,' + (displayOffset - header.height) + 'px,0)'
            }
          },
          h
        ),
        _react2.default.createElement(
          'div',
          {
            className: 'ptr-content ' + (disableTrans ? 'disableTrans' : ''),
            ref: 'content',
            style: {
              transform: 'translate3d(0,' + displayOffset + 'px,0)',
              WebkitTransform: 'translate3d(0,' + displayOffset + 'px,0)',
              overflowY: pullOffset > 0 ? 'hidden' : 'auto'
            },
            onScroll: this.handleScroll
          },
          children
        )
      );
    }
  }]);

  return PullToRefresh;
}(Component);

PullToRefresh.propTypes = {
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  distanceToRefresh: _react.PropTypes.number,
  header: _react.PropTypes.shape({
    height: _react.PropTypes.number.isRequired,
    render: _react.PropTypes.func.isRequired
  }).isRequired,
  loading: _react.PropTypes.bool.isRequired,
  resistance: _react.PropTypes.number,
  onRefresh: _react.PropTypes.func.isRequired,
  onEndReachedThreshold: _react.PropTypes.number,
  onEndReached: _react.PropTypes.func
};
PullToRefresh.defaultProps = {
  className: '',
  style: {},
  distanceToRefresh: 60,
  resistance: 2.5,
  onEndReachedThreshold: 0
};
exports.default = PullToRefresh;