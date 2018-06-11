import React from 'react'
import PropTypes from 'prop-types'

const styles = {
  height: '200px',
  overflow: 'auto'
}

const getParcelableItem = (array, start = 0, end = 0) => {
  return array.slice(start, end)
}

const getTexts = (texts, start, end) => {
  const newTexts = getParcelableItem(texts, start, end)
  return { textsRendered: newTexts, texts: texts }
}

const totalItemsByView = (heightWindow, heightCell) => {
  return Math.round((heightWindow + 10) / heightCell)
}

const styleScroll = {
  height: '20px'
}

class VirtualList extends React.PureComponent {
  constructor() {
    super()
    this.scrollRef = React.createRef()
    this.scrollPosition = 0
    this.oldScrollPosition = 0
    this.startIndex = 0
    this.endIndex = 0
    this.state = { texts: [], textsRendered: [] }
  }

  componentDidMount() {
    this.startIndex = 0
    const heightCell = 20
    this.endIndex = totalItemsByView(200, heightCell)
    this.setState(
      getTexts(this.props.data, this.startIndex, this.endIndex)
    )
  }

  handleScroll = () => {
    const scrollH =
      this.scrollRef.current.scrollHeight - this.scrollRef.current.scrollTop
    const heightCell = 20
    if (scrollH === this.scrollRef.current.offsetHeight) {
      this.startIndex = this.endIndex - totalItemsByView(200, heightCell)
      this.endIndex += 5
      this.setState(getTexts(this.state.texts, this.startIndex, this.endIndex))
      this.scrollRef.current.scrollTop = this.scrollRef.current.scrollTop - 20
    } else if (this.scrollRef.current.scrollTop === 0) {
      this.startIndex -= 2
      if (this.startIndex <= 0) {
        this.startIndex = 0
        this.scrollRef.current.scrollTop = 0
      } else {
        this.scrollRef.current.scrollTop = 20
      }
      this.endIndex -= 2
      this.setState(getTexts(this.state.texts, this.startIndex, this.endIndex))
    }
  };

  mountData = (data) => {
    return data.map((item, index) => <div style={styleScroll} key={index}>{item}</div>)
  }

  render() {
    const list = this.mountData(this.state.textsRendered)
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
  data: PropTypes.array.isRequired
}

export default VirtualList
