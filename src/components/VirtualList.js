import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  height: '200px',
  overflow: 'auto'
}

const ScrollDirection = {
  DOWN: -1,
  UP: 1
}
const START_POSTION_SCROLL = 0
const INITIAL_INDEX = 0
const TOTAL_INDEX_RECUR_DOWN = 5
const TOTAL_INDEX_RECUR_UP = 2

const getParcelableItem = (array, start = 0, end = 0) => {
  return array.slice(start, end)
}

const getData = (data, startIndex, endIndex) => {
  const dataRendered = getParcelableItem(data, startIndex, endIndex)
  return {
    dataRendered,
    data,
    startIndex,
    endIndex
  }
}

const totalItemsByView = (heightWindow, heightCell) => {
  return Math.round((heightWindow + 10) / heightCell)
}

const getHeightCell = (heightCell = 20) => heightCell

const styleScroll = {
  height: '20px'
}

class VirtualList extends React.PureComponent {
  constructor() {
    super()
    this.scrollRef = React.createRef()
    this.state = {
      data: [],
      dataRendered: [],
      startIndex: INITIAL_INDEX,
      endIndex: INITIAL_INDEX
    }
  }

  isSCrollDirection = () => {
    const scrollHPosition = this.calcScrollHeight()
    if (scrollHPosition === this.scrollRef.current.offsetHeight) {
      return ScrollDirection.DOWN
    } else if (this.scrollRef.current.scrollTop === START_POSTION_SCROLL) {
      return ScrollDirection.UP
    }
  }

  componentDidMount() {
    const { startIndex } = this.state
    const heightCell = getHeightCell(this.props.heightCell)
    const endIndex = totalItemsByView(this.props.heightWindow, heightCell)
    this.setState(
      getData(this.props.data, startIndex, endIndex)
    )
  }

  calcScrollHeight = () => {
    return this.scrollRef.current.scrollHeight - this.scrollRef.current.scrollTop
  }

  calcIndexsByDiraction = (DIRECTION_SCROLL, state) => {
    let { startIndex, endIndex } = state
    const heightCell = getHeightCell(this.props.heightCell)
    if (DIRECTION_SCROLL === ScrollDirection.DOWN) {
      startIndex = (endIndex - totalItemsByView(this.props.heightWindow, heightCell))
      endIndex += TOTAL_INDEX_RECUR_DOWN
    } else if (DIRECTION_SCROLL === ScrollDirection.UP) {
      startIndex -= TOTAL_INDEX_RECUR_UP
      endIndex -= TOTAL_INDEX_RECUR_UP
      if (startIndex <= START_POSTION_SCROLL) {
        startIndex = INITIAL_INDEX
      }
    }

    return { startIndex, endIndex }
  }

  handleScroll = () => {
    const heightCell = getHeightCell(this.props.heightCell)

    if (this.isSCrollDirection() === ScrollDirection.DOWN) {
      const { startIndex, endIndex } = this.calcIndexsByDiraction(ScrollDirection.DOWN, this.state)
      this.setState(getData(this.state.data, startIndex, endIndex))
      this.scrollRef.current.scrollTop = this.scrollRef.current.scrollTop - heightCell
    } else if (this.isSCrollDirection() === ScrollDirection.UP) {
      const { startIndex, endIndex } = this.calcIndexsByDiraction(ScrollDirection.UP, this.state)
      if (startIndex === INITIAL_INDEX) {
        this.scrollRef.current.scrollTop = INITIAL_INDEX
      } else {
        this.scrollRef.current.scrollTop = 20
      }
      this.setState(getData(this.state.data, startIndex, endIndex))
    }
  };

  mountData = (data) => {
    return data.map((item, index) => <div style={styleScroll} key={index}>{item}</div>)
  }

  render() {
    const list = this.mountData(this.state.dataRendered)
    return (
      <div
        style={styles}
        ref={this.scrollRef}
        onScroll={this.handleScroll}>
        { list }
      </div>
    )
  }
}

VirtualList.propTypes = {
  data: PropTypes.array.isRequired,
  heightCell: PropTypes.number,
  heightWindow: PropTypes.number.isRequired
}

export default VirtualList
