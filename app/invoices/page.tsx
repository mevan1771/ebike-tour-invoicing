'use client';

import { FaFileInvoiceDollar } from 'react-icons/fa';
import PlaceholderPage from '../components/PlaceholderPage';

export default function Invoices() {
  return (
    <PlaceholderPage 
      title="Invoices"
      description="Manage all your e-bike tour invoices in one place."
      icon={<FaFileInvoiceDollar className="h-6 w-6" />}
    />
  );
} 