import React from 'react'
import { VirtualList } from 'virtual-list'

const totalData = 10000;

const loadData = size => {
  return Array(size)
    .fill()
    .map((i, index) => " lorem ipsum: " + index);
};

export default class App extends React.Component {
  render() {
    const list = loadData(totalData);
    return(
      <div style={{width: "200px", marginLeft: "100px" }}>
        <p>Total data: {totalData}</p>
        <VirtualList data={list} />
      </div>
    );
  }
}
