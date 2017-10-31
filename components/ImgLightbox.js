import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class ImgLightbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showed: false
    }
  }
  componentDidMount() {
    if (!document.querySelector('div.imgLightboxContainer', document.body)) {
      const container = document.createElement('div')
      container.setAttribute('class', 'imgLightboxContainer')
      document.body.appendChild(container)
    }
    this.container = document.querySelector('div.imgLightboxContainer', document.body)
    this.container.addEventListener('click', this.switchShow)
  }
  componentWillUpdate(nextProps, nextState) {
    if (this.showed !== nextState.showed) {
      this.switchContainer()
    }
  }
  componentWilUnmount() {
    this.container.removeEventListener('click', this.switchShow)
  }
  switchShow = (e) => {
    this.setState({ showed: !this.state.showed }, () => this.switchContainer(e))
  }
  switchContainer = (e) => {
    if (this.state.showed) {
      this.container.setAttribute('style', 'display: block')
      requestAnimationFrame(() => this.container.setAttribute('style', 'display: block; opacity: 1'))
    } else {
      this.container.setAttribute('style', 'opacity: 0')
      setTimeout(() => {
        this.container.setAttribute('style', 'display: none')
      }, 500)
    }
  }
  render() {
    const { children } = this.props
    if (Array.isArray(children)) {
      return null
    } else if (children.type !== 'img') {
      return null
    }
    return React.createElement(
      children.type,
      Object.assign({}, children.props, {
        ref: (elem) => this.domElem = elem,
        onClick: (e) => this.setState({ showed: !this.state.showed })
      })
    )
  }
}

export default ImgLightbox