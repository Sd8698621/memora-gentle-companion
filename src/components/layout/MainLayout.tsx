
import React from 'react';
import { SidebarProvider } from '@/components/ui/sidebar';
import Sidebar from '@/components/layout/Sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  const isMobile = useIsMobile();

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <Sidebar />
        <main className={`flex-1 flex flex-col ${isMobile ? 'py-6 px-4' : 'py-8 px-6'}`}>
          {children}
        </main>
      </div>
    </SidebarProvider>
  );
};

export default MainLayout;
