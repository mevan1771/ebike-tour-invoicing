'use client';

import { useState, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import { FaBicycle } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import StepWizard from '../../components/StepWizard';
import WizardNavigation from '../../components/WizardNavigation';

// Import step components dynamically
const TourInformationStep = dynamic(() => import('./TourInformationStep'), { ssr: false });
const GroupDetailsStep = dynamic(() => import('./GroupDetailsStep'), { ssr: false });
const RatesStep = dynamic(() => import('./RatesStep'), { ssr: false });
const InvoicePreviewStep = dynamic(() => import('./InvoicePreviewStep'), { ssr: false });

// Define the tour data structure
export interface TourData {
  // Tour Information
  tourName: string;
  invoiceNumber: string;
  startDate: string;
  endDate: string;
  invoiceDate: string;
  
  // Group Details
  numberOfRiders: number;
  singleRooms: number;
  doubleRooms: number;
  tourLeaderName: string;
  
  // Rates
  currency: string;
  accommodationRate: number;
  transportRate: number;
  bikeRentalRate: number;
  attractionsRate: number;
  additionalServices: {
    name: string;
    rate: number;
  }[];
  
  // Optional notes
  notes?: string;
}

// Define steps
const STEPS = ['Tour Information', 'Group Details', 'Rates', 'Invoice Preview'];

export default function NewTourPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  
  // Initialize tour data
  const [tourData, setTourData] = useState<TourData>({
    tourName: '',
    invoiceNumber: `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
    startDate: '',
    endDate: '',
    invoiceDate: new Date().toISOString().split('T')[0], // Today's date
    
    numberOfRiders: 1,
    singleRooms: 0,
    doubleRooms: 0,
    tourLeaderName: '',
    
    currency: 'USD',
    accommodationRate: 0,
    transportRate: 0,
    bikeRentalRate: 0,
    attractionsRate: 0,
    additionalServices: [],
    
    notes: ''
  });

  // Handle data updates from steps
  const handleDataChange = (newData: Partial<TourData>) => {
    setTourData(prevData => ({
      ...prevData,
      ...newData
    }));
  };

  // Navigation handlers
  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, STEPS.length - 1));
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleFinish = () => {
    // In a real app, save the tour data to your backend
    console.log('Tour data to be saved:', tourData);
    
    // Navigate to dashboard or somewhere else
    alert('Tour invoice created successfully!');
    router.push('/dashboard');
  };

  // Step content based on current step
  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return <TourInformationStep tourData={tourData} onChange={handleDataChange} />;
      case 1:
        return <GroupDetailsStep tourData={tourData} onChange={handleDataChange} />;
      case 2:
        return <RatesStep tourData={tourData} onChange={handleDataChange} />;
      case 3:
        return <InvoicePreviewStep tourData={tourData} onFinish={handleFinish} />;
      default:
        return null;
    }
  };

  // Check if next button should be disabled
  const isNextDisabled = () => {
    // You can add validation logic here if needed
    return false;
  };

  return (
    <div className="p-3">
      <div className="mb-2">
        <div className="flex items-center">
          <FaBicycle className="h-6 w-6 text-primary-600 mr-2" />
          <h1 className="text-xl font-bold text-gray-900">Create New Tour</h1>
        </div>
        <p className="text-sm text-gray-500 ml-8">
          Fill in the details to create a new tour and generate an invoice.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-3">
          <Suspense fallback={<div className="text-center p-4">Loading form...</div>}>
            <StepWizard
              steps={STEPS}
              currentStep={currentStep + 1}
              onStepChange={setCurrentStep}
            >
              {renderStepContent()}
            </StepWizard>

            <WizardNavigation
              currentStep={currentStep + 1}
              totalSteps={STEPS.length}
              onNext={handleNext}
              onPrevious={handlePrevious}
              onFinish={handleFinish}
              disableNext={isNextDisabled()}
            />
          </Suspense>
        </div>
      </div>
    </div>
  );
} 