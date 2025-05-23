import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const InputField = ({
  title,
  onBlur,
  onChange,
  name,
  value,
  placeholder,
  type,
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="">
      <label className="block text-[12px] font-medium text-gray-700 mb-1">
        {title}
      </label>

      <div className="relative">
        <input
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          type={isPassword ? (showPassword ? "text" : "password") : type}
          placeholder={placeholder}
          className="w-full px-4 py-2 text-sm text-black border border-gray-200 rounded-lg  focus:outline-none focus:ring-1 focus:ring-fadeprimary  pr-10"
        />

        {isPassword && (
          <span
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </span>
        )}
      </div>
    </div>
  );
};

export default InputField;
