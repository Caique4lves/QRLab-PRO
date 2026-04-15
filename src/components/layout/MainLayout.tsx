import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f5f5f5] flex flex-col font-sans">
      <Header />
      <Hero />
      <main className="flex-1 container mx-auto py-8 px-4 max-w-7xl">
        {children}
      </main>
      <footer className="py-6 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} QR Code Styling Clone • Built with React & Tailwind
      </footer>
    </div>
  );
};
