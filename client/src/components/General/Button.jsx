import React from "react";

const Button = ({children, type, onClick}) => {
  return (
    <>
      <button
        className="h-10 w-full bg-primary p-2 text-[13px] rounded-lg cursor-pointer"
        type={type}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};

export default Button;
