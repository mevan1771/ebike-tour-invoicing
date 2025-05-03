'use client';

import { ReactNode } from 'react';
import DashboardLayout from '../dashboard/layout';

export default function InvoicesLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
} 