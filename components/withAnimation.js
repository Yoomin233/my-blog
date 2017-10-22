import React, { Component } from 'react'

class WithAnimation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animateList: Array(props.children.length).fill(false),
      timerList: Array(props.children.length),
      transition: Object.keys(props.beforeEnter).map(item => `${item} ${props.duration} ${props.timingFunc}`).join(', ')
    }
  }
  componentDidMount() {
    const { children, stagger } = this.props
    const { timerList } = this.state
    children.forEach((item, index) => {
      timerList[index] = setTimeout(() => this.setState(({ animateList }) => {
        animateList[index] = true
        return { animateList }
      }), stagger * (1 + index))
    })
  }
  componentWillUnmount() {
    const { timerList } = this.state
    timerList.forEach(timer => clearTimeout(timer))
  }
  render() {
    const { children } = this.props
    const { transition, animateList } = this.state
    return children.map((item, index) => React.createElement(
      item.type,
      Object.assign({}, item.props, {
        style: Object.assign(item.props.style ? item.props.style : {}, animateList[index] ? null : this.props.beforeEnter, { transition }),
        key: index
      }),
    ))
  }
}

export default WithAnimation