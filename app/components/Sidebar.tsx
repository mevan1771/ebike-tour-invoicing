'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  FaTachometerAlt, 
  FaFileInvoiceDollar, 
  FaBicycle, 
  FaUsers, 
  FaChartBar, 
  FaCog, 
  FaCalendarAlt,
  FaChevronLeft,
  FaChevronRight,
  FaPlusCircle
} from 'react-icons/fa';

interface SidebarProps {
  onCollapse?: (collapsed: boolean) => void;
}

export default function Sidebar({ onCollapse }: SidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  const links = [
    { name: 'Dashboard', href: '/dashboard', icon: <FaTachometerAlt /> },
    { name: 'Invoices', href: '/invoices', icon: <FaFileInvoiceDollar /> },
    { name: 'Tours', href: '/tours', icon: <FaBicycle /> },
    { name: 'Customers', href: '/customers', icon: <FaUsers /> },
    { name: 'Calendar', href: '/calendar', icon: <FaCalendarAlt /> },
    { name: 'Reports', href: '/reports', icon: <FaChartBar /> },
    { name: 'Settings', href: '/settings', icon: <FaCog /> },
  ];

  const toggleSidebar = () => {
    const newCollapsedState = !collapsed;
    setCollapsed(newCollapsedState);
    if (onCollapse) {
      onCollapse(newCollapsedState);
    }
  };

  return (
    <div 
      className={`bg-white h-screen shadow-md transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      } fixed left-0 top-0 z-10`}
    >
      <div className="flex flex-col h-full">
        {/* Logo and Title */}
        <div className="flex items-center p-4 border-b border-gray-200">
          <Link href="/dashboard" className="flex-shrink-0 flex items-center">
            <FaBicycle className="h-8 w-8 text-primary-600" />
            {!collapsed && (
              <span className="ml-2 text-xl font-bold text-gray-800">E-Bike Tours</span>
            )}
          </Link>
        </div>
        
        {/* New Tour Button */}
        <div className="px-4 py-3 border-b border-gray-200">
          <Link 
            href="/tours/new" 
            className={`flex items-center justify-center p-2 rounded-lg bg-primary-600 hover:bg-primary-700 text-white shadow-sm transition-colors ${
              collapsed ? 'w-8 h-8 mx-auto' : 'w-full'
            }`}
          >
            <FaPlusCircle className={`${collapsed ? 'mx-auto' : 'mr-2'}`} />
            {!collapsed && <span className="font-medium">New Tour</span>}
            {collapsed && <span className="sr-only">New Tour</span>}
          </Link>
        </div>
        
        {/* Navigation Links */}
        <div className="flex-1 py-6 overflow-y-auto">
          <ul className="space-y-2 px-2">
            {links.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className={`flex items-center p-2 rounded-lg ${
                      isActive 
                        ? 'bg-primary-50 text-primary-600' 
                        : 'text-gray-600 hover:bg-gray-100'
                    } transition-colors`}
                  >
                    <div className={`text-lg ${collapsed ? 'mx-auto' : ''}`}>{link.icon}</div>
                    {!collapsed && (
                      <span className="ml-3 font-medium">{link.name}</span>
                    )}
                    {collapsed && (
                      <span className="sr-only">{link.name}</span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
        
        {/* Collapse Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={toggleSidebar}
            className="flex items-center justify-center w-full p-2 text-gray-500 rounded-lg hover:bg-gray-100"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? <FaChevronRight /> : <FaChevronLeft />}
            {!collapsed && <span className="ml-2">Collapse</span>}
          </button>
        </div>
      </div>
    </div>
  );
} 