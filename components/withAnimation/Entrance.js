import React, { Component } from 'react'

class Entrance extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animateList: Array(props.children.length).fill(false),
      transition: Object.keys(props.beforeEnter).map(item => `${item} ${props.duration} ${props.timingFunc}`).join(', ')
    }
  }
  componentDidMount() {
    const { children, stagger } = this.props
    if (stagger) {
      children.forEach((item, index) => {
        setTimeout(() => this.setState(({ animateList }) => {
          animateList[index] = true
          return { animateList }
        }), stagger * (1 + index))
      })
    } else {
      this.setState({
        animateList: Array(children.length).fill(false)
      })
    }
  }
  render() {
    const { children } = this.props
    const { transition, animateList } = this.state
    return children.map((item, index) => React.createElement(
      'p',
      Object.assign({}, item.props, {
        style: Object.assign(item.props.style ? item.props.style : {}, animateList[index] ? null : this.props.beforeEnter, { transition }),
        key: index
      }),
    ))
  }
}

Entrance.defaultProps = {
  beforeEnter: { transform: 'translateX(50%)', opacity: 0 },
  duration: '0.8s',
  timingFunc: 'ease-in-out',
  stagger: 200
}

export default Entrance