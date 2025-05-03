'use client';

import React, { ReactNode } from 'react';

interface PlaceholderPageProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

export default function PlaceholderPage({ 
  title,
  description,
  icon
}: PlaceholderPageProps) {
  return (
    <div className="bg-white shadow rounded-lg p-8 text-center">
      <div className="flex flex-col items-center justify-center space-y-4">
        {icon && (
          <div className="h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center text-primary-600">
            {icon}
          </div>
        )}
        
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        
        <p className="text-gray-500 max-w-md">{description}</p>
        
        <div className="mt-8 text-sm text-gray-500">
          This section is under development. We&apos;re working hard to make it available soon!
        </div>
      </div>
    </div>
  );
} 