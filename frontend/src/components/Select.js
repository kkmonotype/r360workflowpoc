import React from 'react';

const Select = ({ options, ...rest }) => {
  return (
    <select {...rest}
    className="mt-1 form-select ar-select w-full"
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default Select;
