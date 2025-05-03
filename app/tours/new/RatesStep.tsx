'use client';

import React from 'react';
import { 
  FaMoneyBillWave, 
  FaHotel, 
  FaBus, 
  FaBicycle, 
  FaLandmark, 
  FaCoffee, 
  FaPlusCircle, 
  FaMinusCircle 
} from 'react-icons/fa';
import FormInput from '../../components/FormInput';
import SelectInput from '../../components/SelectInput';
import NumericInput from '../../components/NumericInput';
import { TourData } from './page';

interface RatesStepProps {
  tourData: TourData;
  onChange: (updatedData: Partial<TourData>) => void;
}

export default function RatesStep({ tourData, onChange }: RatesStepProps) {
  const currencies = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'JPY', label: 'JPY - Japanese Yen' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
    { value: 'CHF', label: 'CHF - Swiss Franc' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    onChange({ [name]: value });
  };

  const handleSelectChange = (name: string, value: string) => {
    onChange({ [name]: value });
  };

  const handleNumericChange = (name: string, value: number) => {
    onChange({ [name]: value });
  };

  const handleAdditionalServiceChange = (index: number, field: string, value: any) => {
    const updatedServices = [...tourData.additionalServices];
    if (field === 'name') {
      updatedServices[index] = { 
        ...updatedServices[index], 
        name: value,
        rate: updatedServices[index].rate
      };
    } else if (field === 'rate') {
      updatedServices[index] = {
        ...updatedServices[index], 
        name: updatedServices[index].name,
        rate: value
      };
    }
    onChange({ additionalServices: updatedServices });
  };

  const addAdditionalService = () => {
    const updatedServices = [...tourData.additionalServices, { 
      name: '', 
      rate: 0
    }];
    onChange({ additionalServices: updatedServices });
  };

  const removeAdditionalService = (index: number) => {
    const updatedServices = tourData.additionalServices.filter((_, i) => i !== index);
    onChange({ additionalServices: updatedServices });
  };

  // Calculate total based on current rates
  const calculateTotal = () => {
    const baseTotal = (
      (tourData.accommodationRate) +
      (tourData.transportRate) +
      (tourData.bikeRentalRate * tourData.numberOfRiders) +
      (tourData.attractionsRate * tourData.numberOfRiders)
    );
    
    const additionalServicesTotal = tourData.additionalServices.reduce((sum, service) => {
      return sum + service.rate;
    }, 0);
    
    return baseTotal + additionalServicesTotal;
  };

  const calculateNights = () => {
    if (!tourData.startDate || !tourData.endDate) return 0;
    
    const start = new Date(tourData.startDate);
    const end = new Date(tourData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const calculateTotalRooms = () => {
    return tourData.singleRooms + tourData.doubleRooms;
  };

  return (
    <div className="py-2">
      <div className="grid grid-cols-1 gap-4 max-w-4xl mx-auto">
        <SelectInput
          label="Currency"
          name="currency"
          value={tourData.currency}
          onChange={(value) => handleSelectChange('currency', value)}
          options={currencies}
          required
          icon={<FaMoneyBillWave />}
          helpText="Select the currency for this invoice"
          className="mb-2"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumericInput
            label="Accommodation Rate (total)"
            name="accommodationRate"
            value={tourData.accommodationRate}
            onChange={(value) => handleNumericChange('accommodationRate', value)}
            min={0}
            step={1}
            icon={<FaHotel />}
            helpText={`${calculateNights()} nights, ${calculateTotalRooms()} rooms`}
          />

          <NumericInput
            label="Transport Total"
            name="transportRate"
            value={tourData.transportRate}
            onChange={(value) => handleNumericChange('transportRate', value)}
            min={0}
            step={1}
            icon={<FaBus />}
            helpText="Total cost for all transportation"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <NumericInput
            label="Bike Rental (per person)"
            name="bikeRentalRate"
            value={tourData.bikeRentalRate}
            onChange={(value) => handleNumericChange('bikeRentalRate', value)}
            min={0}
            step={1}
            icon={<FaBicycle />}
            helpText={`For ${tourData.numberOfRiders} riders`}
          />

          <NumericInput
            label="Attractions (per person)"
            name="attractionsRate"
            value={tourData.attractionsRate}
            onChange={(value) => handleNumericChange('attractionsRate', value)}
            min={0}
            step={1}
            icon={<FaLandmark />}
            helpText={`For ${tourData.numberOfRiders} riders`}
          />
        </div>

        {/* Additional Services Section */}
        <div className="bg-gray-50 p-3 rounded-lg mt-2">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-md font-medium text-gray-700">Additional Services</h3>
            <button
              type="button"
              onClick={addAdditionalService}
              className="inline-flex items-center text-sm px-2 py-1 border border-transparent rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
            >
              <FaPlusCircle className="mr-1" />
              Add Service
            </button>
          </div>

          {tourData.additionalServices.map((service, index) => (
            <div key={index} className="bg-white p-3 rounded-lg mb-2 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormInput
                  label="Service Name"
                  name={`service-name-${index}`}
                  value={service.name}
                  onChange={(e) => handleAdditionalServiceChange(index, 'name', e.target.value)}
                  placeholder="e.g. Guide Service"
                  required
                  icon={<FaCoffee />}
                />
                
                <div className="relative">
                  <NumericInput
                    label="Rate (Total)"
                    name={`service-rate-${index}`}
                    value={service.rate}
                    onChange={(value) => handleAdditionalServiceChange(index, 'rate', value)}
                    min={0}
                    step={1}
                  />
                  
                  <button
                    type="button"
                    onClick={() => removeAdditionalService(index)}
                    className="absolute right-0 top-0 mt-1 mr-1 text-red-600 hover:text-red-800"
                    aria-label="Remove service"
                  >
                    <FaMinusCircle />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total Section */}
        <div className="bg-primary-100 p-3 rounded-lg mt-2">
          <div className="text-right">
            <span className="text-sm text-primary-700">Total Amount:</span>
            <div className="text-xl font-bold text-primary-800">
              {new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency: tourData.currency || 'USD' 
              }).format(calculateTotal())}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 