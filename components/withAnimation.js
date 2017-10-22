import React, { Component } from 'react'

class WithAnimation extends Component {
  render () {
    const {children} = this.props
    return children.map(item => React.createElement(
      item.type,
      Object.assign({}, item.props, {className:item.props.className + ' 333'}),
    ))
  }
}

export default WithAnimation