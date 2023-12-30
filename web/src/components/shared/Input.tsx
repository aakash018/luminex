import React from "react";

interface Props {
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
}

const Input: React.FC<Props> = ({ label, placeholder, type = "text" }) => {
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-lg">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="text-2xl bg-transparent border-b-2 border-gray-500 w-full focus:dark:border-theme-dark-prm focus:border-theme-light-prm transition-all duration-700 outline-none"
      />
    </div>
  );
};

export default Input;
