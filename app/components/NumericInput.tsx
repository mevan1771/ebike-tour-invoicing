'use client';

import React, { ReactNode } from 'react';
import { FaMinus, FaPlus } from 'react-icons/fa';

interface NumericInputProps {
  label: string;
  name: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  required?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  error?: string;
  helpText?: string;
  className?: string;
}

export default function NumericInput({
  label,
  name,
  value,
  onChange,
  min = 0,
  max,
  step = 1,
  required = false,
  disabled = false,
  icon,
  error,
  helpText,
  className = '',
}: NumericInputProps) {
  const increment = () => {
    if (max !== undefined && value >= max) return;
    onChange(value + step);
  };

  const decrement = () => {
    if (value <= min) return;
    onChange(value - step);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) {
      onChange(min);
      return;
    }
    if (max !== undefined && newValue > max) {
      onChange(max);
      return;
    }
    if (newValue < min) {
      onChange(min);
      return;
    }
    onChange(newValue);
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className="relative flex">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500 z-10">
            <div className="flex items-center justify-center w-5 h-5">
              {icon}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={decrement}
          disabled={disabled || value <= min}
          className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-l-md border border-r-0 border-gray-300"
        >
          <FaMinus className="h-3 w-3" />
        </button>

        <input
          type="number"
          id={name}
          name={name}
          value={value}
          onChange={handleInputChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          required={required}
          className={`block w-full rounded-none shadow-sm ${
            icon ? 'pl-10' : 'pl-3'
          } pr-3 py-2 sm:text-sm border ${
            error 
              ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
          } ${disabled ? 'bg-gray-100 text-gray-500' : ''}`}
        />

        <button
          type="button"
          onClick={increment}
          disabled={disabled || (max !== undefined && value >= max)}
          className="flex items-center justify-center p-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-r-md border border-l-0 border-gray-300"
        >
          <FaPlus className="h-3 w-3" />
        </button>
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
} 