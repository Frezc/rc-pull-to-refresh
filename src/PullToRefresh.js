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

  handleTouchStart = e => {
    if (this.props.loading) return;
    this.lastY = e.changedTouches[0].pageY;
    this.setState({ disableTrans: true });
  };

  handleTouchMove = e => {
    if (this.props.loading) return;
    const contentEl = this.refs.content;
    const touch = e.changedTouches[0];
    if (contentEl.scrollTop <= 0) {
      this.setState((prevState) => ({
        pullOffset: Math.max(prevState.pullOffset + (touch.pageY - this.lastY) * (1 / this.props.resistance), 0)
      }), () => {
        this.lastY = touch.pageY;
      })
    } else {
      this.lastY = touch.pageY;
    }
  };

  handleTouchEnd = e => {
    if (this.props.loading) return;
    const { distanceToRefresh, onRefresh } = this.props;
    if (this.state.pullOffset >= distanceToRefresh) {
      onRefresh && onRefresh();
    }
    this.setState({
      pullOffset: 0,
      disableTrans: false
    })
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

  render () {
    const { children, className, style, header, distanceToRefresh, loading, onScroll } = this.props;
    const { pullOffset, disableTrans } = this.state;
    const displayOffset = loading ? header.height: pullOffset;

    const h = header.render({
        loading,
        offset: pullOffset,
        canRefresh: pullOffset >= distanceToRefresh
    });
    return (
      <div
        className={`pull-to-refresh ${className}`}
        style={style}
        onTouchStart={this.handleTouchStart}
        onTouchMove={this.handleTouchMove}
        onTouchEnd={this.handleTouchEnd}
      >
        <div
          className={`ptr-header ${disableTrans ? 'disableTrans' : ''}`}
          style={{
            transform: `translate3d(0,${displayOffset - header.height}px,0)`,
            WebkitTransform: `translate3d(0,${displayOffset - header.height}px,0)`
          }}
        >
          {h}
        </div>
        <div
          className={`ptr-content ${disableTrans ? 'disableTrans' : ''}`}
          ref="content"
          style={{
            transform: `translate3d(0,${displayOffset}px,0)`,
            WebkitTransform: `translate3d(0,${displayOffset}px,0)`,
            overflowY: pullOffset > 0 ? 'hidden' : 'auto'
          }}
          onScroll={this.handleScroll}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default PullToRefresh;
