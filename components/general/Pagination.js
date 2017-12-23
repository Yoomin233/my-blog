import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  static proptypes = {
    total: PropTypes.number.isRequired,
    onClickPage: PropTypes.func,
    currentPage: PropTypes.number.isRequired
  };
  static defaultProps = {
    size: 10
  };
  render() {
    const { total, onClickPage, size, currentPage } = this.props;
    const totalPages = Math.ceil(total / size);
    return (
      <div>
        <button
          className="first"
          disabled={currentPage === 0}
          onClick={e => onClickPage(0)}
        >
          &lt;&lt;
        </button>
        <button
          className="prev"
          disabled={currentPage === 0}
          onClick={e => onClickPage(currentPage - 1)}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }).map((item, index) => (
          <button
            className={
              currentPage === index ? "currentPage pageBtn" : "pageBtn"
            }
            key={index}
            onClick={e =>
              onClickPage && index !== currentPage && onClickPage(index)
            }
          >
            {index + 1}
          </button>
        ))}
        <button
          className="next"
          disabled={currentPage === totalPages - 1}
          onClick={e => onClickPage(currentPage + 1)}
        >
          &gt;
        </button>
        <button
          className="last"
          disabled={currentPage === totalPages - 1}
          onClick={e => onClickPage(totalPages - 1)}
        >
          &gt;&gt;
        </button>
        <style jsx>{`
          div {
            text-align: center;
            display: flex;
            justify-content: center;
          }
          button {
            background-color: transparent;
            outline: none;
            border: none;
            font-size: 1.1em;
            cursor: pointer;
            margin: 1%;
            position: relative;
            line-height: 2;
            &:focus {
              outline: none;
            }
            &:disabled {
              cursor: not-allowed;
            }
          }
          button.pageBtn {
            width: 2em;
            &::before,
            &::after {
              content: "";
              width: 100%;
              height: 1px;
              display: block;
              background-color: transparent;
            }
            &.currentPage::before {
              background-color: #000;
            }
            &::after {
              background-color: #000;
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

export default Pagination;
