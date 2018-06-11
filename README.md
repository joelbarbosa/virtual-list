# virtual-list

> virtualize data list (In the process of experiment)

[![NPM](https://img.shields.io/npm/v/virtual-list.svg)](https://www.npmjs.com/package/virtual-list) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Usage

<img src="assets/virtual-list.gif" width="300">

```jsx
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
      <VirtualList data={list} />
    );
  }
}
```

## License

MIT © [joelbarbosa](https://github.com/joelbarbosa)
