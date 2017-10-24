export default (props) => (
  <div className='loadingContainer'>
    <div className="dot"></div>
    <div className="dot"></div>
    <div className="dot"></div>
    <style jsx>{`
      .loadingContainer {
        width: 100%;
        height: 100%;
        position: relative;
        background-color: #eee;
        display: flex;
        align-items: center;
        justify-content: center;
        .dot {
          width: 16px;
          height: 16px;
          border-radius: 50%;
          background-color: #aaa;
          margin: 8px;
          animation: pulse 2s infinite linear;
          &:nth-child(2) {
            animation-delay: .2s;
          }
          &:nth-child(3) {
            animation-delay: .4s;
          }
        }
      }
      @keyframes pulse {
        10% {
          transform: scale(1.5);
        }
        20% {
          transform: none;
        }
      }
    `}</style>
  </div>
)