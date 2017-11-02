import React, { Component } from 'react'

import { throttle, debounce } from '../../tools'

class FadeIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      transition: 'opacity .6s linear',
      opacity: 0,
    }
    this.checkIfNeededToShow = throttle(debounce(this.checkIfNeededToShow, 200), 500)
  }
  componentDidMount() {
    const { whenInViewPort } = this.props
    this.clientHeight = document.documentElement.clientHeight
    if (whenInViewPort) {
      const { top } = this.fadedElem.getBoundingClientRect()
      // if already in viewport
      if (top < this.clientHeight) {
        this.setState({
          opacity: 1
        })
      } else {
        // setup event listener
        console.log('seted!')
        document.addEventListener('scroll', this.checkIfNeededToShow, { passive: true })
      }
    } else {
      this.setState({
        opacity: 1
      })
    }
  }
  componentWillUnmount () {
    document.removeEventListener('scroll', this.checkIfNeededToShow)
  }
  checkIfNeededToShow = () => {
    console.log('called!')
    const { top, height } = this.fadedElem.getBoundingClientRect()
    if (top + height / 2 < this.clientHeight ) {
      this.setState({
        opacity: 1
      })
      document.removeEventListener('scroll', this.checkIfNeededToShow)
    }
    // const clientHeight = document.documentElement.clientHeight
    // // if already in viewport
    // if (bottom - height < clientHeight) {
    //   this.setState({
    //     opacity: 1
    //   })
    // } else {
    //   // setup event listener
    //   document.addEventListener('scroll', this.setHeaderClassName, { passive: true })
    // }
  }
  render() {
    const { children } = this.props
    return React.createElement(
      children.type,
      Object.assign({ ref: (elem) => this.fadedElem = elem }, children.props, {
        style: Object.assign({}, children.props.style, this.state)
      })
    )
  }
}

export default FadeIn