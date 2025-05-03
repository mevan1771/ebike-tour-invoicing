'use client';

import React from 'react';
import { FaHashtag, FaBicycle } from 'react-icons/fa';
import FormInput from '../../components/FormInput';
import DatePickerInput from '../../components/DatePickerInput';
import { TourData } from './page';

interface TourInformationStepProps {
  tourData: TourData;
  onChange: (updatedData: Partial<TourData>) => void;
}

export default function TourInformationStep({ tourData, onChange }: TourInformationStepProps) {
  // Format today's date as YYYY-MM-DD
  const today = new Date().toISOString().split('T')[0];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleDateChange = (name: string, value: string) => {
    onChange({ [name]: value });
  };

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
        <FormInput
          label="Tour Name"
          name="tourName"
          value={tourData.tourName}
          onChange={handleInputChange}
          placeholder="e.g. City Explorer Tour"
          required
          icon={<FaBicycle />}
          className="mb-2"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            label="Invoice Number"
            name="invoiceNumber"
            value={tourData.invoiceNumber}
            onChange={handleInputChange}
            required
            icon={<FaHashtag />}
            helpText="Automatically generated but can be edited"
          />

          <DatePickerInput
            label="Invoice Date"
            name="invoiceDate"
            value={tourData.invoiceDate}
            onChange={(date) => handleDateChange('invoiceDate', date)}
            required
            minDate={today}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <DatePickerInput
            label="Start Date"
            name="startDate"
            value={tourData.startDate}
            onChange={(date) => handleDateChange('startDate', date)}
            required
            minDate={today}
          />

          <DatePickerInput
            label="End Date"
            name="endDate"
            value={tourData.endDate}
            onChange={(date) => handleDateChange('endDate', date)}
            required
            minDate={tourData.startDate || today}
            error={
              tourData.startDate && 
              tourData.endDate && 
              tourData.endDate < tourData.startDate 
                ? 'End date must be after start date' 
                : undefined
            }
          />
        </div>
      </div>
    </div>
  );
} 