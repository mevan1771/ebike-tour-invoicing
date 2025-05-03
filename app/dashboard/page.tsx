'use client';

import { 
  FaFileInvoiceDollar, 
  FaBicycle, 
  FaUsers, 
  FaMoneyBillWave 
} from 'react-icons/fa';

import DashboardCard from '../components/DashboardCard';
import QuickActions from '../components/QuickActions';
import RecentInvoices from '../components/RecentInvoices';

export default function Dashboard() {
  return (
    <>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome to your E-Bike Tour Invoicing System</p>
      </div>
      
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <DashboardCard 
          title="Total Revenue" 
          value="$12,650.50" 
          icon={<FaMoneyBillWave className="h-5 w-5" />}
          trend={{ value: 12.5, isPositive: true }}
        />
        <DashboardCard 
          title="Total Invoices" 
          value="124" 
          icon={<FaFileInvoiceDollar className="h-5 w-5" />}
          trend={{ value: 8.2, isPositive: true }}
        />
        <DashboardCard 
          title="Total Tours" 
          value="56" 
          icon={<FaBicycle className="h-5 w-5" />}
          trend={{ value: 5.1, isPositive: true }}
        />
        <DashboardCard 
          title="Customers" 
          value="78" 
          icon={<FaUsers className="h-5 w-5" />}
          trend={{ value: 3.2, isPositive: true }}
        />
      </div>
      
      {/* Quick Actions */}
      <div className="mb-6">
        <QuickActions />
      </div>
      
      {/* Recent Invoices */}
      <div className="mb-6">
        <RecentInvoices />
      </div>
    </>
  );
} 