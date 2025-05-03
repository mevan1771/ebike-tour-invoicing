'use client';

import React from 'react';
import { FaUsers, FaUser, FaBed, FaHotel } from 'react-icons/fa';
import FormInput from '../../components/FormInput';
import NumericInput from '../../components/NumericInput';
import { TourData } from './page';

interface GroupDetailsStepProps {
  tourData: TourData;
  onChange: (updatedData: Partial<TourData>) => void;
}

export default function GroupDetailsStep({ tourData, onChange }: GroupDetailsStepProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleNumericChange = (name: string, value: number) => {
    onChange({ [name]: value });
  };

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
        <NumericInput
          label="Number of Riders"
          name="numberOfRiders"
          value={tourData.numberOfRiders}
          onChange={(value) => handleNumericChange('numberOfRiders', value)}
          min={1}
          required
          icon={<FaUsers />}
          helpText="Total number of participants on the tour"
          className="mb-2"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumericInput
            label="Single Rooms"
            name="singleRooms"
            value={tourData.singleRooms}
            onChange={(value) => handleNumericChange('singleRooms', value)}
            min={0}
            icon={<FaBed />}
            helpText="Number of single occupancy rooms"
          />

          <NumericInput
            label="Double Rooms"
            name="doubleRooms"
            value={tourData.doubleRooms}
            onChange={(value) => handleNumericChange('doubleRooms', value)}
            min={0}
            icon={<FaHotel />}
            helpText="Number of double occupancy rooms"
          />
        </div>

        <FormInput
          label="Tour Leader Name"
          name="tourLeaderName"
          value={tourData.tourLeaderName}
          onChange={handleInputChange}
          placeholder="e.g. Jane Smith"
          required
          icon={<FaUser />}
          helpText="The person responsible for leading the tour"
          className="mb-2"
        />

        {/* Room allocation validation */}
        {tourData.numberOfRiders > 0 && 
         (tourData.singleRooms + (tourData.doubleRooms * 2) < tourData.numberOfRiders) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Warning:</span> Not enough rooms allocated for all riders. You need to allocate rooms for {tourData.numberOfRiders - (tourData.singleRooms + (tourData.doubleRooms * 2))} more riders.
                </p>
              </div>
            </div>
          </div>
        )}

        {tourData.numberOfRiders > 0 && 
         (tourData.singleRooms + (tourData.doubleRooms * 2) > tourData.numberOfRiders) && (
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-medium">Note:</span> You've allocated more beds than riders. There are {(tourData.singleRooms + (tourData.doubleRooms * 2)) - tourData.numberOfRiders} extra beds.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 