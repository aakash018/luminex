import React from "react";

interface Props {
  label: string;
  placeholder?: string;
  type?: React.HTMLInputTypeAttribute;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  value?: string;
}

const Input: React.FC<Props> = ({
  label,
  placeholder,
  type = "text",
  setValue,
  value,
}) => {
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-lg lg:text-base">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          if (setValue) setValue(e.target.value);
        }}
        className="text-[1.3rem] lg:text-base bg-transparent border-b-2 border-gray-500 w-full focus:dark:border-theme-dark-prm focus:border-theme-light-prm transition-all duration-700 outline-none"
      />
    </div>
  );
};

export default Input;
