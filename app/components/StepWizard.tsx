'use client';

import React from 'react';
import { FaCheck, FaCircle } from 'react-icons/fa';

interface StepWizardProps {
  steps: string[];
  currentStep: number;
  onStepChange?: (step: number) => void;
  children: React.ReactNode;
  allowNavigation?: boolean;
}

export default function StepWizard({
  steps,
  currentStep,
  onStepChange,
  children,
  allowNavigation = true,
}: StepWizardProps) {
  // Ensure currentStep is within bounds
  const safeCurrentStep = Math.max(1, Math.min(currentStep, steps.length));
  
  const handleStepClick = (stepNumber: number) => {
    if (!allowNavigation) return;
    if (stepNumber <= safeCurrentStep) {
      onStepChange?.(stepNumber);
    }
  };

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-4 px-2">
        <div className="flex items-center">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isActive = stepNumber === safeCurrentStep;
            const isCompleted = stepNumber < safeCurrentStep;
            const isClickable = stepNumber <= safeCurrentStep && allowNavigation;

            return (
              <React.Fragment key={stepNumber}>
                {/* Step circle */}
                <button
                  type="button"
                  onClick={() => handleStepClick(stepNumber)}
                  disabled={!isClickable}
                  className={`
                    flex items-center justify-center w-6 h-6 rounded-full
                    transition-colors duration-200
                    ${isCompleted ? 'bg-primary-600 text-white' : ''}
                    ${isActive ? 'bg-primary-600 text-white' : ''}
                    ${!isActive && !isCompleted ? 'bg-gray-200 text-gray-400' : ''}
                    ${isClickable ? 'hover:bg-primary-700 cursor-pointer' : 'cursor-default'}
                  `}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {isCompleted ? (
                    <FaCheck className="w-3 h-3" />
                  ) : (
                    <span className="text-xs font-medium">{stepNumber}</span>
                  )}
                </button>

                {/* Step name */}
                <span 
                  className={`ml-2 text-xs font-medium ${
                    isActive || isCompleted ? 'text-primary-600' : 'text-gray-500'
                  }`}
                >
                  {step}
                </span>

                {/* Connector line */}
                {stepNumber < steps.length && (
                  <div className="flex-auto mx-2 h-0.5 bg-gray-200">
                    <div 
                      className="h-0.5 bg-primary-600 transition-all"
                      style={{ width: isCompleted ? '100%' : '0%' }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Content area */}
      <div className="mt-2">
        {children}
      </div>
    </div>
  );
} 