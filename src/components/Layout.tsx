
import { Sidebar } from './Sidebar';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const router = useRouter();
  
  // Redirect to chat by default
  useEffect(() => {
    if (router.pathname === '/') {
      // Already on chat page
    }
  }, [router.pathname]);
  
  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-hidden">
        {children}
      </main>
    </div>
  );
}
