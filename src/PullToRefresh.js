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
    onRefresh: PropTypes.func
  };

  static defaultProps = {
    className: '',
    style: {},
    distanceToRefresh: 60,
    resistance: 2.5
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

  render () {
    const { children, className, style, header, distanceToRefresh, loading } = this.props;
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
          style={{ top: displayOffset - header.height }}
        >
          {h}
        </div>
        <div
          className={`ptr-content ${disableTrans ? 'disableTrans' : ''}`}
          ref="content"
          style={{ top: displayOffset, overflowY: pullOffset > 0 ? 'hidden' : 'auto' }}
        >
          {children}
        </div>
      </div>
    )
  }
}

export default PullToRefresh;
