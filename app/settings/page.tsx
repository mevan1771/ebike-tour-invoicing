'use client';

import { FaCog } from 'react-icons/fa';
import PlaceholderPage from '../components/PlaceholderPage';

export default function Settings() {
  return (
    <PlaceholderPage 
      title="Settings"
      description="Configure your e-bike tour invoicing system settings."
      icon={<FaCog className="h-6 w-6" />}
    />
  );
} 