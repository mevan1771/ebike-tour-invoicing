'use client';

import React from 'react';
import { TourData } from './page';
import { FaSave, FaPrint } from 'react-icons/fa';

interface InvoicePreviewStepProps {
  tourData: TourData;
  onFinish: () => void;
}

export default function InvoicePreviewStep({ tourData, onFinish }: InvoicePreviewStepProps) {
  // Calculate date difference in days
  const calculateNights = () => {
    if (!tourData.startDate || !tourData.endDate) return 0;
    
    const start = new Date(tourData.startDate);
    const end = new Date(tourData.endDate);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  // Calculate total based on rates
  const calculateSubtotal = () => {
    const accommodationTotal = tourData.accommodationRate;
    const transportTotal = tourData.transportRate;
    const bikeRentalTotal = tourData.bikeRentalRate;
    const attractionsTotal = tourData.attractionsRate;
    
    const additionalServicesTotal = tourData.additionalServices.reduce(
      (sum, service) => sum + service.rate, 0
    );
    
    return accommodationTotal + transportTotal + bikeRentalTotal + attractionsTotal + additionalServicesTotal;
  };

  const subtotal = calculateSubtotal();
  const taxRate = 0.05; // 5%
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: tourData.currency || 'USD' 
    }).format(amount);
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className="py-2">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-sm p-4 print:shadow-none">
        {/* Invoice Header */}
        <div className="border-b border-gray-200 pb-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold text-gray-800">{tourData.tourName || 'Tour Invoice'}</h1>
              <p className="text-gray-600">Invoice #{tourData.invoiceNumber || 'N/A'}</p>
            </div>
            <div className="text-right">
              <p className="text-sm">
                <span className="font-medium">Invoice Date:</span> {tourData.invoiceDate || new Date().toLocaleDateString()}
              </p>
              <p className="text-sm">
                <span className="font-medium">Tour Dates:</span> {tourData.startDate} - {tourData.endDate}
              </p>
              <p className="text-sm">
                <span className="font-medium">Duration:</span> {calculateNights()} nights
              </p>
            </div>
          </div>
        </div>

        {/* Tour Summary */}
        <div className="py-3 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <h3 className="text-sm font-medium text-gray-500">GROUP DETAILS</h3>
              <p className="mt-1">
                <span className="font-medium">Tour Leader:</span> {tourData.tourLeaderName || 'N/A'}
              </p>
              <p>
                <span className="font-medium">Number of Riders:</span> {tourData.numberOfRiders}
              </p>
              <p>
                <span className="font-medium">Rooms:</span> {tourData.singleRooms} single, {tourData.doubleRooms} double
              </p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">BILLING INFORMATION</h3>
              <p className="mt-1">
                <span className="font-medium">Currency:</span> {tourData.currency || 'USD'}
              </p>
            </div>
          </div>
        </div>

        {/* Itemized Charges */}
        <div className="py-3 border-b border-gray-200">
          <h3 className="text-sm font-medium text-gray-500 mb-2">CHARGES</h3>
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left pb-2 font-medium">Item</th>
                <th className="text-right pb-2 font-medium">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-1">Accommodation</td>
                <td className="py-1 text-right">{formatCurrency(tourData.accommodationRate)}</td>
              </tr>
              <tr>
                <td className="py-1">Transportation</td>
                <td className="py-1 text-right">{formatCurrency(tourData.transportRate)}</td>
              </tr>
              <tr>
                <td className="py-1">Bike Rental</td>
                <td className="py-1 text-right">{formatCurrency(tourData.bikeRentalRate)}</td>
              </tr>
              <tr>
                <td className="py-1">Attractions</td>
                <td className="py-1 text-right">{formatCurrency(tourData.attractionsRate)}</td>
              </tr>
              
              {/* Additional Services */}
              {tourData.additionalServices.map((service, index) => (
                <tr key={index}>
                  <td className="py-1">{service.name}</td>
                  <td className="py-1 text-right">{formatCurrency(service.rate)}</td>
                </tr>
              ))}
              
              {/* Subtotal */}
              <tr className="border-t border-gray-200">
                <td className="py-1 font-medium">Subtotal</td>
                <td className="py-1 text-right font-medium">{formatCurrency(subtotal)}</td>
              </tr>
              
              {/* Tax */}
              <tr>
                <td className="py-1">Tax ({(taxRate * 100).toFixed(0)}%)</td>
                <td className="py-1 text-right">{formatCurrency(tax)}</td>
              </tr>
              
              {/* Total */}
              <tr className="border-t border-gray-200">
                <td className="py-1 text-base font-medium">Total</td>
                <td className="py-1 text-right text-base font-bold">{formatCurrency(total)}</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes */}
        <div className="py-3">
          <h3 className="text-sm font-medium text-gray-500 mb-2">NOTES</h3>
          <p className="text-sm text-gray-600">
            This invoice is for the tour services as described above. Payment is due within 30 days of receipt.
            Thank you for your business.
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end space-x-3 max-w-4xl mx-auto mt-3 print:hidden">
        <button
          type="button"
          onClick={handlePrintInvoice}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FaPrint className="mr-2" />
          Print Invoice
        </button>
        <button
          type="button"
          onClick={onFinish}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FaSave className="mr-2" />
          Save Invoice
        </button>
      </div>
    </div>
  );
} 