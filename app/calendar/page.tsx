'use client';

import { FaCalendarAlt } from 'react-icons/fa';
import PlaceholderPage from '../components/PlaceholderPage';

export default function Calendar() {
  return (
    <PlaceholderPage 
      title="Calendar"
      description="View and schedule your e-bike tours on a calendar."
      icon={<FaCalendarAlt className="h-6 w-6" />}
    />
  );
} 