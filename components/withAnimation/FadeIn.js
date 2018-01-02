import React from "react";
import PropTypes from "prop-types";

export default class Modal extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      containerStyle: {
        display: props.show ? "block" : "none"
      }
    };
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.show && nextProps.show) {
      this.setState({
        containerStyle: {
          display: "block",
          opacity: 0
        }
      });
      requestAnimationFrame(e => {
        this.setState({
          containerStyle: {
            opacity: 1
          }
        });
      });
    } else if (this.props.show && !nextProps.show) {
      const self = this
      this.elem.addEventListener('transitionend', function anony (e) {
        this.setState({
          containerStyle: {
            display: 'none'
          }
        })
        this.elem.removeEventListener('transitionend', anony)
      })
      this.setState({
        containerStyle: {
          opacity: "0"
        }
      });
    }
  }
  render() {
    const { children, show } = this.props;
    const { containerStyle } = this.state;
    return (
      <div
        style={containerStyle}
        className="fadeInContainer"
        ref={elem => (this.elem = elem)}
      >
        {children}
        <style jsx>{`
          div.fadeInContainer {
            transition: all 0.3s ease-in-out;
          }
        `}</style>
      </div>
    );
  }
}
