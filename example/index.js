/**
 * Created by Frezc on 2016/11/5.
 */
import React from 'react';
import { render } from 'react-dom';
import SimplePTR from '../lib/SimplePTR';

class Page extends React.Component {

  state = {
    loading: false,
    dataSource: this.randomData()
  }

  randomData() {
    const ds = [];
    for (var i = 0; i < 100; i++) {
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

  render () {
    const { loading, dataSource } = this.state;

    return (
      <SimplePTR
        className="my-ptr"
        loading={loading}
        onRefresh={this.refresh}
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