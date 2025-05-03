'use client';

import { FaBicycle } from 'react-icons/fa';
import PlaceholderPage from '../components/PlaceholderPage';

export default function Tours() {
  return (
    <PlaceholderPage 
      title="Tours"
      description="Schedule and manage your e-bike tours."
      icon={<FaBicycle className="h-6 w-6" />}
    />
  );
} 