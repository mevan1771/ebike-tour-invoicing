'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to dashboard if accessed from root
    router.push('/dashboard');
  }, [router]);
  
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <h1 className="text-xl font-medium mb-2">Redirecting to dashboard...</h1>
        <p className="text-gray-500">Please wait a moment</p>
      </div>
    </div>
  );
}
