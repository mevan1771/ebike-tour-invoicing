'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaBars, 
  FaTachometerAlt, 
  FaFileInvoiceDollar, 
  FaBicycle, 
  FaUsers, 
  FaCalendarAlt, 
  FaChartLine, 
  FaCog, 
  FaChevronLeft, 
  FaPlusCircle 
} from 'react-icons/fa';

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

export default function Sidebar({ onCollapse }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
    if (onCollapse) {
      onCollapse(!collapsed);
    }
  };

  const isActive = (path: string) => {
    return pathname?.startsWith(path);
  };

  return (
    <aside 
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-10 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200">
        <div className={`flex items-center ${collapsed ? 'justify-center w-full' : ''}`}>
          <div className="text-primary-600">
            <FaBicycle className="h-6 w-6" />
          </div>
          
          {!collapsed && (
            <h1 className="ml-2 text-xl font-semibold text-gray-900">E-Bike Tours</h1>
          )}
        </div>
        
        <button
          onClick={toggleCollapse}
          className={`text-gray-500 hover:text-gray-700 ${collapsed ? 'hidden' : ''}`}
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          <FaChevronLeft className="h-4 w-4" />
        </button>

        <button
          onClick={toggleCollapse}
          className={`text-gray-500 hover:text-gray-700 ${collapsed ? '' : 'hidden'}`}
          aria-label="Expand sidebar"
        >
          <FaBars className="h-4 w-4" />
        </button>
      </div>

      <div className="p-4">
        <div className={`mb-6 ${collapsed ? 'hidden' : ''}`}>
          <Link
            href="/tours/new"
            className="w-full flex items-center justify-center px-4 py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
          >
            <FaPlusCircle className="mr-2" />
            <span>New Tour</span>
          </Link>
        </div>

        <div className={`${collapsed ? 'flex justify-center mb-6' : 'hidden'}`}>
          <Link
            href="/tours/new"
            className="p-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
            title="New Tour"
          >
            <FaPlusCircle className="h-5 w-5" />
          </Link>
        </div>

        <nav className="space-y-1">
          <NavItem
            href="/dashboard"
            icon={<FaTachometerAlt />}
            label="Dashboard"
            active={isActive('/dashboard')}
            collapsed={collapsed}
          />
          
          <NavItem
            href="/invoices"
            icon={<FaFileInvoiceDollar />}
            label="Invoices"
            active={isActive('/invoices')}
            collapsed={collapsed}
          />
          
          <NavItem
            href="/tours"
            icon={<FaBicycle />}
            label="Tours"
            active={isActive('/tours')}
            collapsed={collapsed}
          />
          
          <NavItem
            href="/customers"
            icon={<FaUsers />}
            label="Customers"
            active={isActive('/customers')}
            collapsed={collapsed}
          />
          
          <NavItem
            href="/calendar"
            icon={<FaCalendarAlt />}
            label="Calendar"
            active={isActive('/calendar')}
            collapsed={collapsed}
          />
          
          <NavItem
            href="/reports"
            icon={<FaChartLine />}
            label="Reports"
            active={isActive('/reports')}
            collapsed={collapsed}
          />
          
          <NavItem
            href="/settings"
            icon={<FaCog />}
            label="Settings"
            active={isActive('/settings')}
            collapsed={collapsed}
          />
        </nav>
      </div>
    </aside>
  );
}

interface NavItemProps {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  collapsed: boolean;
}

function NavItem({ href, icon, label, active, collapsed }: NavItemProps) {
  return (
    <Link
      href={href}
      className={`flex items-center px-2 py-2 rounded-md ${
        active
          ? 'bg-primary-50 text-primary-600'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
      } ${collapsed ? 'justify-center' : ''}`}
    >
      <div className="text-lg">{icon}</div>
      {!collapsed && <span className="ml-3 text-sm font-medium">{label}</span>}
    </Link>
  );
} 