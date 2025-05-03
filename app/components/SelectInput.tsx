'use client';

import React, { ReactNode } from 'react';
import { FaChevronDown } from 'react-icons/fa';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (value: string) => void;
  options: SelectOption[];
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  error?: string;
  helpText?: string;
  placeholder?: string;
  className?: string;
}

export default function SelectInput({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  disabled = false,
  icon,
  error,
  helpText,
  placeholder,
  className = '',
}: SelectInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className={`w-full ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative rounded-md shadow-sm">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400">
            <div className="flex items-center justify-center w-5 h-5">
              {icon}
            </div>
          </div>
        )}
        
        <select
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          required={required}
          disabled={disabled}
          className={`
            block w-full rounded-md sm:text-sm border-gray-300 appearance-none
            ${icon ? 'pl-10' : 'pl-3'}
            pr-8 py-2
            ${error ? 'border-red-300 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'}
            ${disabled ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}
          `}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-gray-500">
          <FaChevronDown className="h-4 w-4" />
        </div>
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
      
      {helpText && !error && (
        <p className="mt-1 text-sm text-gray-500">{helpText}</p>
      )}
    </div>
  );
} 