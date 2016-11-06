import React, { PropTypes } from 'react';
import PullToRefresh from './PullToRefresh';
import ArrowUp from './ArrowUp';
import Refreshing from './Refreshing';

import './sptr.css';

const Component = React.PureComponent || React.Component;
class SimplePTR extends Component {

  static propTypes = {
    loading: PropTypes.bool,
    onRefresh: PropTypes.func
  };

  static defaultProps = {};

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
    const { loading, onRefresh, children, className, style, resistance } = this.props

    return (
      <PullToRefresh
        className={className}
        loading={loading}
        style={style}
        distanceToRefresh={60}
        resistance={resistance}
        header={{
          height: 60,
          render: this.renderHeader
        }}
        onRefresh={onRefresh}
      >
        {children}
      </PullToRefresh>
    )
  }
}

export default SimplePTR;
