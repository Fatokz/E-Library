import styled from "styled-components";

const Input = () => {
  return (
    <StyledWrapper>
      <div className="messageBox">
        <input
          id="messageInput"
          type="text"
          placeholder="Your email address"
          required
        />
        <button id="sendButton">
          <svg
            viewBox="0 0 664 663"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              fill="none"
            />
            <path
              d="M646.293 331.888L17.7538 17.6187L155.245 331.888M646.293 331.888L17.753 646.157L155.245 331.888M646.293 331.888L318.735 330.228L155.245 331.888"
              stroke="#6c6c6c"
              strokeWidth="33.67"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .messageBox {
    width: 100%; /* Let it fill its container */
    max-width: 400px; /* Optional: constrain it on larger screens */
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: #515b60;
    padding: 0 10px;
    border-radius: 5px;
    box-sizing: border-box;
    overflow: hidden; /* Prevents content spill */
  }

  #messageInput {
    flex: 1; /* Take all available space */
    min-width: 0; /* Prevents flex overflow */
    height: 100%;
    background-color: transparent;
    outline: none;
    border: none;
    padding-left: 5px;
    color: #f5f5f5;
    font-size: 14px;
  }

  #messageInput::placeholder {
    font-size: 13px;
    color: #ccc;
  }

  #sendButton {
    flex-shrink: 0; /* Prevent it from shrinking */
    background-color: transparent;
    outline: none;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    color: white;
    transition: all 0.3s;
  }

  #sendButton svg {
    height: 18px;
    transition: all 0.3s;
  }

  #sendButton svg path {
    stroke: white;
    fill: none;
    transition: all 0.3s;
  }

  #sendButton:hover svg path,
  #messageInput:focus ~ #sendButton svg path,
  #messageInput:valid ~ #sendButton svg path {
    fill: #eb5231;
    stroke: white;
  }
`;

export default Input;
