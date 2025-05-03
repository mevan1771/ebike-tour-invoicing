'use client';

import React from 'react';
import { FaArrowLeft, FaArrowRight, FaSave } from 'react-icons/fa';

interface WizardNavigationProps {
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrevious: () => void;
  onFinish: () => void;
  disableNext?: boolean;
  disablePrevious?: boolean;
}

export default function WizardNavigation({
  currentStep,
  totalSteps,
  onNext,
  onPrevious,
  onFinish,
  disableNext = false,
  disablePrevious = false,
}: WizardNavigationProps) {
  const isFirstStep = currentStep === 1;
  const isLastStep = currentStep === totalSteps;

  return (
    <div className="flex justify-between items-center pt-3 mt-2 border-t border-gray-200">
      <button
        type="button"
        onClick={onPrevious}
        disabled={isFirstStep || disablePrevious}
        className={`
          flex items-center text-sm px-3 py-1 rounded-md
          ${isFirstStep || disablePrevious
            ? 'text-gray-300 cursor-not-allowed'
            : 'text-gray-700 hover:bg-gray-100'}
        `}
      >
        <FaArrowLeft className="mr-1" />
        Back
      </button>

      <div className="text-xs text-gray-500">
        Step {currentStep} of {totalSteps}
      </div>

      {isLastStep ? (
        <button
          type="button"
          onClick={onFinish}
          disabled={disableNext}
          className={`
            flex items-center text-sm px-3 py-1 rounded-md text-white
            ${disableNext
              ? 'bg-primary-300 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700'}
          `}
        >
          <FaSave className="mr-1" />
          Finish
        </button>
      ) : (
        <button
          type="button"
          onClick={onNext}
          disabled={disableNext}
          className={`
            flex items-center text-sm px-3 py-1 rounded-md text-white
            ${disableNext
              ? 'bg-primary-300 cursor-not-allowed'
              : 'bg-primary-600 hover:bg-primary-700'}
          `}
        >
          Next
          <FaArrowRight className="ml-1" />
        </button>
      )}
    </div>
  );
} 