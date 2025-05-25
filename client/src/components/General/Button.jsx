import React from "react";

const Button = ({ children, disabled, type, onClick, className = "" }) => {
  return (
    <>
      <button
        disabled={disabled}
        className={`h-10 w-full bg-primary p-2 text-[13px] rounded-lg cursor-pointer ${className}`}
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
