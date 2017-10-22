import React, { Component } from 'react'

class WithAnimation extends Component {
  render () {
    const {children} = this.props
    return children.map(item => React.createElement(
      item.type,
      Object.assign({}, item.props, {style: Object.assign({}, item.props.style, this.props.beforeEnter)}),
    ))
  }
}

export default WithAnimation