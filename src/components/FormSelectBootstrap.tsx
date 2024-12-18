// FormSelectBootstrap.tsx
import React, { ChangeEvent } from 'react';

interface FormSelectBootstrapProps {
  label: string;
  name: string;
  placeholder: string;
  options: { value: string; label: string; }[];
  value: string; // Add this line
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void; // Add this line
}

const FormSelectBootstrap: React.FC<FormSelectBootstrapProps> = ({
  label,
  name,
  placeholder,
  options,
  value, // Add this line
  onChange // Add this line
}) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select
        id={name}
        name={name}
        className="form-select"
        placeholder={placeholder}
        value={value} // Add this line
        onChange={onChange} // Add this line
      >
        <option value="">{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelectBootstrap;
