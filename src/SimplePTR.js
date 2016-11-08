import React, { PropTypes } from 'react';
import PullToRefresh from './PullToRefresh';
import ArrowUp from './ArrowUp';
import Refreshing from './Refreshing';

import './sptr.css';

const Component = React.PureComponent || React.Component;
class SimplePTR extends Component {

  static propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    onRefresh: PropTypes.func.isRequired,
    resistance: PropTypes.number,
    onEndReachedThreshold: PropTypes.number,
    onEndReached: PropTypes.func
  };

  renderHeader = ({ loading, canRefresh, offset }) => {
    if (loading) {
      return (
        <div className="sptr-header">
          <Refreshing />
        </div>
      )
    } else {
      return (
        <div className="sptr-header">
          {canRefresh ?
            <ArrowUp className="rotate-arrow"/>
            : <ArrowUp className="rotate-arrow reverse"/>
          }
        </div>
      )
    }
  };

  render() {
    const props = Object.assign({}, this.props, {
      distanceToRefresh: 60,
      header: {
        height: 60,
        render: this.renderHeader
      }
    });

    return (
      <PullToRefresh
        {...props}
      />
    )
  }
}

export default SimplePTR;
