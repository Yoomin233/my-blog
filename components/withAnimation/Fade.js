import React, { Component } from 'react'

class Fade extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transition: 'opacity 1s linear',
      opacity: 0,
    }
  }
  componentDidMount() {
    const { fadeIn } = this.props
    if (fadeIn) {
      requestAnimationFrame(() => {
        this.setState({
          opacity: 1
        })
      })
    }
    console.log(this.fadedElem)
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.fadeIn !== this.props.fadeIn) {
      this.setState({
        opacity: nextProps.fadeIn ? 1 : 0
      })
    }
  }
  render() {
    const { children } = this.props
    return React.createElement(
      children.type,
      Object.assign({ref: (elem) => this.fadedElem = elem}, children.props, {
        style: Object.assign({}, children.props.style, this.state)
      })
    )
  }
}

Fade.defaultProps = {
  fadeIn: true
}

export default Fade