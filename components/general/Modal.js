import React from "react";
import PropTypes from "prop-types";

import Portal from "./Portal";
import FadeIn from "../withAnimation/FadeIn";

export default class Modal extends React.Component {
  static propTypes = {
    show: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired
  };
  render() {
    const { show, children, onClose } = this.props;
    return (
      <Portal>
        <FadeIn show={show}>
          <div className="modalShade" onClick={onClose}>
            <div className="modalBody">
              <p>modal header</p>
              {children}
            </div>
            <style jsx>{`
              div.modalShade {
                position: fixed;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                z-index: 1024;
                background-color: rgba(0,0,0,0.6);
                color: #fff;
              }
              div.modalBody {
                
              }
            `}</style>
          </div>
        </FadeIn>
      </Portal>
    );
  }
}
