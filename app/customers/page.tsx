'use client';

import { FaUsers } from 'react-icons/fa';
import PlaceholderPage from '../components/PlaceholderPage';

export default function Customers() {
  return (
    <PlaceholderPage 
      title="Customers"
      description="View and manage your customer information."
      icon={<FaUsers className="h-6 w-6" />}
    />
  );
} 