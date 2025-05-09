import React from "react";
import styled from "styled-components";

const Button = () => {
  return (
    <StyledWrapper>
      <button className="animated-button">
        <svg
          viewBox="0 0 24 24"
          className="arr-2"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
        <span className="text">Readmore</span>
        <span className="circle" />
        <svg
          viewBox="0 0 24 24"
          className="arr-1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
        </svg>
      </button>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .animated-button {
    position: relative;
    display: flex;
    align-items: center;
    gap: 6px; /* More space between text and arrow */
    padding: 2px 8px;
    font-size: 10px;
    background-color: inherit;
    border-radius: 50px;
    font-weight: 500;
    color: #eb5231;
    border: none;
    box-shadow: 0 0 0 1px #eb5231;
    cursor: pointer;
    overflow: hidden;
    transition: background-color 0.3s, color 0.3s, box-shadow 0.3s;
    height: 24px;
    min-width: 60px;
  }

  .animated-button .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 6px;
    height: 6px;
    background-color: #eb5231;
    border-radius: 50%;
    opacity: 0;
    transition: width 0.4s, height 0.4s, opacity 0.4s;
    pointer-events: none;
    z-index: 0;
  }

  .animated-button .text {
    position: relative;
    z-index: 1;
    transform: translateX(0); /* No offset */
    transition: transform 0.4s;
  }

  .animated-button:hover {
    color: #fff;
    background-color: #eb5231;
  }

  .animated-button:hover .text {
    transform: translateX(4px); /* Slight slide for animation */
  }

  .animated-button:hover svg {
    fill: #fff;
  }

  .animated-button:hover .circle {
    width: 40px;
    height: 40px;
    opacity: 0.3;
  }

  .animated-button:active {
    transform: scale(0.95);
  }
`;

export default Button;