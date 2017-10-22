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
    children.forEach((item, index) => {
      setTimeout(() => this.setState(({ animateList }) => {
        console.log(animateList)
        animateList[index] = true
        return { animateList }
      }), stagger * (1 + index))
    })
  }
  render() {
    const { children } = this.props
    const { transition, animateList } = this.state
    return children.map((item, index) => React.createElement(
      item.type,
      Object.assign({}, item.props, {
        style: Object.assign({}, item.props.style, animateList[index] ? null : this.props.beforeEnter, { transition }),
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