import React, { ChangeEvent } from "react";

interface LabelledInputTypes {
  label: string;
  placeholder: string;
  type: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ label, placeholder, type, onChange }: LabelledInputTypes) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={label}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        onChange={onChange}
        id={label}
        type={type}
        className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:ring-blue-500 focus:border-blue-500"
        placeholder={placeholder}
        required
      />
    </div>
  );
};

export default Input;
