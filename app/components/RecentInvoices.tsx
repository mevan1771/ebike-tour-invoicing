'use client';

import Link from 'next/link';
import { FaFileInvoiceDollar, FaExternalLinkAlt } from 'react-icons/fa';

// Dummy data for demonstration
const recentInvoices = [
  {
    id: 'INV-001',
    customer: 'John Doe',
    tour: 'City Explorer Tour',
    amount: '$120.00',
    status: 'Paid',
    date: '2023-10-15'
  },
  {
    id: 'INV-002',
    customer: 'Jane Smith',
    tour: 'Mountain Adventure',
    amount: '$180.00',
    status: 'Pending',
    date: '2023-10-12'
  },
  {
    id: 'INV-003',
    customer: 'Michael Johnson',
    tour: 'Coastal Ride Tour',
    amount: '$150.00',
    status: 'Paid',
    date: '2023-10-10'
  },
  {
    id: 'INV-004',
    customer: 'Emily Brown',
    tour: 'Forest Trail Expedition',
    amount: '$200.00',
    status: 'Overdue',
    date: '2023-10-05'
  }
];

export default function RecentInvoices() {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Invoices</h2>
        <Link 
          href="/invoices" 
          className="flex items-center text-sm font-medium text-primary-600 hover:text-primary-800"
        >
          View all
          <FaExternalLinkAlt className="ml-1 h-3 w-3" />
        </Link>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Invoice
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tour
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {recentInvoices.map((invoice) => (
              <tr key={invoice.id} className="hover:bg-gray-50">
                <td className="px-4 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <FaFileInvoiceDollar className="mr-2 text-gray-400" />
                    <Link href={`/invoices/${invoice.id}`} className="text-sm font-medium text-primary-600 hover:text-primary-800">
                      {invoice.id}
                    </Link>
                  </div>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                  {invoice.customer}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.tour}
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {invoice.amount}
                </td>
                <td className="px-4 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                    ${invoice.status === 'Paid' && 'bg-green-100 text-green-800'}
                    ${invoice.status === 'Pending' && 'bg-yellow-100 text-yellow-800'}
                    ${invoice.status === 'Overdue' && 'bg-red-100 text-red-800'}
                  `}>
                    {invoice.status}
                  </span>
                </td>
                <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                  {invoice.date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 