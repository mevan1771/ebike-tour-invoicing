'use client';

import Link from 'next/link';
import { 
  FaFileInvoice, 
  FaCalendarPlus, 
  FaUserPlus, 
  FaChartLine 
} from 'react-icons/fa';

interface ActionButtonProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  color: string;
}

function ActionButton({ icon, text, href, color }: ActionButtonProps) {
  return (
    <Link 
      href={href} 
      className={`flex flex-col items-center justify-center p-6 rounded-lg ${color} text-white transition-transform hover:scale-105 shadow-sm`}
    >
      <div className="text-2xl mb-3">{icon}</div>
      <span className="font-medium">{text}</span>
    </Link>
  );
}

export default function QuickActions() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <ActionButton 
          icon={<FaFileInvoice />} 
          text="New Invoice" 
          href="/invoices/new" 
          color="bg-primary-600 hover:bg-primary-700"
        />
        <ActionButton 
          icon={<FaCalendarPlus />} 
          text="Schedule Tour" 
          href="/tours/new" 
          color="bg-secondary-600 hover:bg-secondary-700"
        />
        <ActionButton 
          icon={<FaUserPlus />} 
          text="Add Customer" 
          href="/customers/new" 
          color="bg-green-600 hover:bg-green-700"
        />
        <ActionButton 
          icon={<FaChartLine />} 
          text="View Reports" 
          href="/reports" 
          color="bg-orange-600 hover:bg-orange-700"
        />
      </div>
    </div>
  );
} 