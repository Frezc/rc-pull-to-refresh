import React, { PropTypes } from 'react';
import './ptr.css';

const Component = React.PureComponent || React.Component;
class PullToRefresh extends Component {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    distanceToRefresh: PropTypes.number,
    header: PropTypes.shape({
      height: PropTypes.number.isRequired,
      render: PropTypes.func.isRequired
    }).isRequired,
    loading: PropTypes.bool.isRequired,
    resistance: PropTypes.number,
    onRefresh: PropTypes.func.isRequired,
    onEndReachedThreshold: PropTypes.number,
    onEndReached: PropTypes.func
  };

  static defaultProps = {
    className: '',
    style: {},
    distanceToRefresh: 60,
    resistance: 2.5,
    onEndReachedThreshold: 0
  };

  state = {
    pullOffset: 0,
    disableTrans: false
  };

  lastY = 0;
  pulling = false;

  getTranslate(y) {
    return {
      transform: `translate3d(0,${y}px,0)`,
      WebkitTransform: `translate3d(0,${y}px,0)`,
      MozTransform: `translate3d(0,${y}px,0)`,
      MsTransform: `translate3d(0,${y}px,0)`,
      OTransform: `translate3d(0,${y}px,0)`
    }
  }

  handleTouchStart = e => {
    if (this.props.loading) return;
    const contentEl = this.refs.content;
    if (contentEl.scrollTop < 1) {
      this.setState({ disableTrans: true });
      this.pulling = true;
    }
    this.lastY = e.changedTouches[0].pageY;
  };

  handleTouchMove = e => {
    if (this.state.pullOffset > 0) e.preventDefault();
    if (this.props.loading) return;
    const contentEl = this.refs.content;
    const touch = e.changedTouches[0];
    if (contentEl.scrollTop >= 1) this.pulling = false;
    if (this.pulling) {
      const offset = (touch.pageY - this.lastY) * (1 / this.props.resistance);
      this.setState({
        pullOffset: Math.max(this.state.pullOffset + offset, 0)
      });
    }
    this.lastY = touch.pageY;
  };

  handleTouchEnd = e => {
    if (this.props.loading) return;
    const { distanceToRefresh, onRefresh } = this.props;
    if (this.state.pullOffset >= distanceToRefresh) {
      onRefresh && onRefresh();
    }
    this.pulling = false;
    this.setState({
      pullOffset: 0,
      disableTrans: false
    });
  };

  handleScroll = e => {
    const { onEndReachedThreshold, onEndReached } = this.props;
    if (onEndReached) {
      const { scrollHeight, clientHeight, scrollTop } = e.target;
      if (Math.round(scrollTop) + Math.round(clientHeight) + onEndReachedThreshold >= Math.round(scrollHeight)) {
        onEndReached();
      }
    }
  };

  render() {
    const { children, className, style, header, distanceToRefresh, loading, onScroll } = this.props;
    const { pullOffset, disableTrans } = this.state;
    const displayOffset = loading ? header.height : pullOffset;

    const h = header.render({
      loading,
      offset: pullOffset,
      canRefresh: pullOffset >= distanceToRefresh
    });
    return (
      <div
        className={`pull-to-refresh ${disableTrans ? 'disableTrans' : ''} ${className}`}
        style={{
          ...style,
          ...this.getTranslate(displayOffset)
        }}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <div
          className="ptr-header"
          style={this.getTranslate(-header.height)}
        >
          {h}
        </div>
        <div
          className="ptr-content"
          ref="content"
          onScroll={this.handleScroll}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default PullToRefresh;
