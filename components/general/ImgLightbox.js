import React, { Component } from 'react'
import Portal from './Portal'

class ImgLightbox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showed: false,
      imgStyles: {},
      bgStyles: {}
    }
  }
  togglePortalShow = (e) => {
    const { showed } = this.state
    if (showed) {
      this.switchAnimation(false)
      setTimeout(() => {
        this.setState(() => ({
          showed: false,
        }))
      }, 500)
    } else {
      const { left, top, width } = this.imgElem.getBoundingClientRect()
      this.setState(() => ({
        showed: true,
        imgStyles: {
          left,
          top,
          width
        }
      }), () => requestAnimationFrame(() => this.switchAnimation(true)))
    }
  }
  // do the animation stuff
  switchAnimation = (show) => {
    requestAnimationFrame(() => {
      let bgStyles
      let imgStyles
      const { left, top, width, height } = this.imgElem.getBoundingClientRect()
      if (show) {
        const devicePixelRatio = window.innerHeight / window.innerWidth
        const enlargedIndex = (window.innerWidth * (devicePixelRatio > 1 ? 0.9 : 0.6)) / width
        imgStyles = {
          width: devicePixelRatio > 1 ? '90vw' : '60vw',
          left: devicePixelRatio > 1 ? '5vw' : '20vw',
          top: height / width > 1 ? '20vh' : (window.innerHeight - enlargedIndex * height) / 2
        }
        bgStyles = {
          backgroundColor: 'rgba(255, 255, 255, 0.6)'
        }
      } else {
        imgStyles = {
          width,
          left,
          top
        }
        bgStyles = {
          backgroundColor: 'transparent'
        }
      }
      this.setState({
        imgStyles,
        bgStyles
      })
    })
  }
  render() {
    const { src } = this.props
    const { imgStyles, bgStyles } = this.state
    return [
      <img src={src} alt="" ref={elem => this.imgElem = elem} onClick={this.togglePortalShow} key='img' />,
      this.state.showed ? <Portal key='portal' node={document.body}>
        <div
          className='imgLightBoxContainer'
          onClick={this.togglePortalShow}
          style={{
            ...bgStyles
          }}
        >
          <img src={src} style={{
            ...imgStyles
          }} />
        </div>
      </Portal> : null
    ]
  }
}

export default ImgLightbox