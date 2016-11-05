/**
 * Created by Frezc on 2016/11/5.
 */
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
  }

  static defaultProps = {}

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
  }


  render() {
    const { loading, onRefresh, children, className } = this.props

    return (
      <PullToRefresh
        className={className}
        loading={loading}
        distanceToRefresh={60}
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

export default SimplePTR
