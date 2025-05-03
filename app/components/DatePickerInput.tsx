'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface DatePickerInputProps {
  label: string;
  name: string;
  value: string;
  onChange: (date: string) => void;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helpText?: string;
  minDate?: string;
  maxDate?: string;
  className?: string;
}

export default function DatePickerInput({
  label,
  name,
  value,
  onChange,
  required = false,
  disabled = false,
  error,
  helpText,
  minDate,
  maxDate,
  className = '',
}: DatePickerInputProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [viewDate, setViewDate] = useState(value ? new Date(value) : new Date());
  const calendarRef = useRef<HTMLDivElement>(null);

  // Format date as yyyy-mm-dd
  const formatDate = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  // Handle outside click to close calendar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Get days in month
  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Get day of week for first day of month (0 = Sunday, 6 = Saturday)
  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  // Previous month
  const prevMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() - 1, 1));
  };

  // Next month
  const nextMonth = () => {
    setViewDate(new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 1));
  };

  // Select date
  const selectDate = (day: number) => {
    const selectedDate = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    onChange(formatDate(selectedDate));
    setShowCalendar(false);
  };

  // Check if date is selectable
  const isDateSelectable = (day: number) => {
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    const dateString = formatDate(date);
    
    if (minDate && dateString < minDate) return false;
    if (maxDate && dateString > maxDate) return false;
    return true;
  };

  // Check if date is selected
  const isDateSelected = (day: number) => {
    if (!value) return false;
    const date = new Date(viewDate.getFullYear(), viewDate.getMonth(), day);
    return formatDate(date) === value;
  };

  // Render calendar
  const renderCalendar = () => {
    const year = viewDate.getFullYear();
    const month = viewDate.getMonth();
    const daysInMonth = getDaysInMonth(year, month);
    const firstDayOfMonth = getFirstDayOfMonth(year, month);
    
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    
    const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    
    // Generate the calendar cells
    const days = [];
    // Empty cells before first day of month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="h-8 w-8"></div>);
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const selectable = isDateSelectable(day);
      const selected = isDateSelected(day);
      
      days.push(
        <button
          key={`day-${day}`}
          onClick={() => selectable && selectDate(day)}
          disabled={!selectable}
          className={`h-8 w-8 flex items-center justify-center rounded-full text-sm
            ${selected ? 'bg-primary-600 text-white' : ''}
            ${!selected && selectable ? 'hover:bg-primary-100' : ''}
            ${!selectable ? 'text-gray-300 cursor-not-allowed' : ''}
          `}
        >
          {day}
        </button>
      );
    }
    
    return (
      <div className="absolute z-10 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg p-3" ref={calendarRef}>
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <button 
            onClick={prevMonth} 
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Previous month"
          >
            <FaChevronLeft className="text-gray-600" />
          </button>
          <div className="font-medium">
            {monthNames[month]} {year}
          </div>
          <button 
            onClick={nextMonth} 
            className="p-1 hover:bg-gray-100 rounded-full"
            aria-label="Next month"
          >
            <FaChevronRight className="text-gray-600" />
          </button>
        </div>
        
        {/* Days of week */}
        <div className="grid grid-cols-7 gap-1 mb-1">
          {dayNames.map(day => (
            <div key={day} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500">
              {day}
            </div>
          ))}
        </div>
        
        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {days}
        </div>
      </div>
    );
  };

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      <div className="relative">
        <div className="relative">
          <input
            type="text"
            id={name}
            name={name}
            value={value}
            readOnly
            onClick={() => !disabled && setShowCalendar(!showCalendar)}
            placeholder="YYYY-MM-DD"
            disabled={disabled}
            required={required}
            className={`block w-full rounded-md shadow-sm pl-10 pr-3 py-2 sm:text-sm border cursor-pointer ${
              error 
                ? 'border-red-300 focus:ring-red-500 focus:border-red-500' 
                : 'border-gray-300 focus:ring-primary-500 focus:border-primary-500'
            } ${disabled ? 'bg-gray-100 text-gray-500' : ''}`}
          />
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
            <div className="flex items-center justify-center w-5 h-5">
              <FaCalendarAlt />
            </div>
          </div>
        </div>
        
        {showCalendar && renderCalendar()}
      </div>
      
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      {helpText && !error && <p className="mt-1 text-sm text-gray-500">{helpText}</p>}
    </div>
  );
} 