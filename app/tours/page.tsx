'use client';

import React from 'react';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa';

export default function ToursPage() {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">E-Bike Tours</h1>
        <Link
          href="/tours/new"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <FaPlus className="mr-2" />
          New Tour
        </Link>
      </div>
      
      <div className="bg-white shadow overflow-hidden sm:rounded-md">
        <div className="px-4 py-16 text-center">
          <p className="text-gray-500 text-lg">
            No tours to display yet. Create your first tour by clicking the "New Tour" button.
          </p>
        </div>
      </div>
    </div>
  );
} 