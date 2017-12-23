import React, { Component } from "react";
import PropTypes from "prop-types";

import Link from "next/link";

import { debounce, throttle } from "../tools";

class Header extends Component {
  static proptypes = {
    url: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      className: "headerMenu"
    };
    // 里面的定时器必须较短, 以保证在下一次throttle之前被触发(以免被clearTimeout)
    this.setHeaderClassName = throttle(
      debounce(this.setHeaderClassName, 50),
      100
    );
  }
  componentDidMount() {
    document.addEventListener("scroll", this.setHeaderClassName, {
      passive: true
    });
    this.setHeaderClassName();
  }
  setHeaderClassName = e => {
    const { top } = document.documentElement.getBoundingClientRect();
    if (top < -100) {
      this.setState({
        className: "headerMenu minified"
      });
    } else {
      this.setState({
        className: "headerMenu"
      });
    }
  };
  componentWillUnmount() {
    document.removeEventListener("scroll", this.setHeaderClassName);
  }
  render() {
    const { className } = this.state;
    const { url: { pathname: currentPath } } = this.props;
    const headerStyle =
      currentPath === "/"
        ? {
            color: "#fff"
          }
        : {
            color: "#1490d7",
            boxShadow: "0px 0px 15px rgba(0,0,0,0.3)"
          };
    return (
      <div className={className} style={headerStyle}>
        <Link href="/">
          <h1>Yoomin's Blog</h1>
        </Link>
        <Link href="/">
          <a className={currentPath === "/" ? "selected" : ""}>Home</a>
        </Link>
        <Link href="/about">
          <a className={currentPath === "/about" ? "selected" : ""}>About</a>
        </Link>
        <style jsx>{`
          .headerMenu {
            position: fixed;
            left: 0;
            top: 0;
            background-color: transparent;
            padding: 10px 20px;
            width: 100%;
            font-size: 1.5em;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
            box-sizing: border-box;
            z-index: 1024;
            > h1 {
              font-size: 1.2em;
              flex-grow: 1;
            }
            > * {
              text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
            }
            a {
              color: inherit;
            }
            &.minified {
              font-size: 1.2em;
              background-color: rgba(255, 255, 255, 0.8);
              box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
              a, h1 {
                color: #444;
              }
            }
          }
          a {
            text-decoration: none;
            margin-right: 1em;
            position: relative;
            padding: 0.3em 0;
            &.selected::before,
            &::after {
              content: "_________";
              position: absolute;
              left: 0;
              display: block;
              overflow: hidden;
              color: inherit;
              width: 100%;
              line-height: 1px;
              height: 12px;
            }
            &::before {
              top: -10px;
            }
            &::after {
              transform: scaleX(0);
              transition: transform 0.3s cubic-bezier(0, 1, 0.67, 0.99);
            }
            &:hover::after {
              transform: scaleX(1);
            }
          }
        `}</style>
      </div>
    );
  }
}

export default Header;
