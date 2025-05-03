import React from 'react';

interface PlaceholderPageProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}

export default function PlaceholderPage({ 
  title, 
  description = 'This page is under construction. Check back soon for updates!',
  icon
}: PlaceholderPageProps) {
  return (
    <>
      <div className="mb-6">
        <div className="flex items-center">
          {icon && <div className="mr-2 text-primary-600">{icon}</div>}
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        </div>
        <p className="text-gray-500 mt-1">{description}</p>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <div className="mb-4 text-gray-400">
          <svg className="w-16 h-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-xl font-medium text-gray-900 mb-2">Coming Soon</h2>
        <p className="text-gray-500">
          We're working on building this feature. It will be available in a future update.
        </p>
      </div>
    </>
  );
} 