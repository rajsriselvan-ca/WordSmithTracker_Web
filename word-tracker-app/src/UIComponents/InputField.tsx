import React from "react";
import {InputFieldProps} from "../Types/InputFieldProps_Types"

const InputField: React.FC<InputFieldProps> = ({
  id,
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
  selectOptions = [], 
}) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-1" htmlFor={id}>
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded px-3 py-2 resize-y"
          placeholder={placeholder}
          required={required}
        />
      ) : type === "select" ? (
        <select
          id={id}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:ring-2 focus:ring-primary focus:outline-none"
          required={required}
        >
          <option value="">{placeholder || "Select an option"}</option>
          {selectOptions.map((option) => (
            <option key={option.id} value={option.name}>
              {option.name}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          className="w-full border border-gray-300 rounded px-3 py-2"
          placeholder={placeholder}
          required={required}
        />
      )}
    </div>
  );
};

export default InputField;