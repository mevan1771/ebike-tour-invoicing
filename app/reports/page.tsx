'use client';

import { FaChartBar } from 'react-icons/fa';
import PlaceholderPage from '../components/PlaceholderPage';

export default function Reports() {
  return (
    <PlaceholderPage 
      title="Reports"
      description="View analytics and generate reports for your e-bike tour business."
      icon={<FaChartBar className="h-6 w-6" />}
    />
  );
} 