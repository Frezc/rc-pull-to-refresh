/**
 * Created by Frezc on 2016/11/5.
 */
import React from 'react';
import { render } from 'react-dom';
import SimplePTR from '../src/SimplePTR';

class Page extends React.Component {

  state = {
    loading: false,
    dataSource: this.randomData()
  };

  moreLoading = false;

  randomData(number = 50) {
    const ds = [];
    for (var i = 0; i < number; i++) {
      ds.push(Math.random());
    }
    return ds;
  }

  refresh = () => {
    this.setState({
      loading: true
    });
    setTimeout(() => this.setState({
      loading: false,
      dataSource: this.randomData()
    }), 2000);
  };

  addMore = () => {
    if (!this.moreLoading) {
      this.moreLoading = true;
      setTimeout(() => this.setState((prevState) => ({
        dataSource: prevState.dataSource.concat(this.randomData())
      }), () => this.moreLoading = false));
    }
  };

  render () {
    const { loading, dataSource } = this.state;

    return (
      <SimplePTR
        className="my-ptr"
        loading={loading}
        onRefresh={this.refresh}
        onEndReached={this.addMore}
        onEndReachedThreshold={60}
      >
        {dataSource.map((data, index) =>
          <div key={index} style={{ height: 48 }}>{data}</div>
        )}
      </SimplePTR>
    )
  }
}

render(
  <Page />,
  document.getElementById('main')
);