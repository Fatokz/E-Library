import React from "react";
import logo from "../../assets/images/Logo.svg"

const Logo = () => {
  return (
    <>
      <div className="h-fit w-35 flex gap-1 items-center">
        <img src={logo} alt="BookSync Logo" className="md:size-10 size-8" />
        <p className="font-inter text-black text-[12px] md:text-[14px] font-medium">
          BookSync
        </p>
      </div>
    </>
  );
};

export default Logo;
