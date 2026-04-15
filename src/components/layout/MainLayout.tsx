import React from 'react';
import { Header } from './Header';
import { Hero } from './Hero';

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col font-sans relative overflow-x-hidden">
      {/* Background blobs for glassmorphism effect */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-400/10 rounded-full blur-[120px] pointer-events-none" />
      
      <Header />
      <Hero />
      <main className="flex-1 container mx-auto py-8 px-4 max-w-7xl relative z-10">
        {children}
      </main>
      <footer className="py-6 text-center text-gray-400 text-xs relative z-10">
        © {new Date().getFullYear()} QRLab PRO • Built with React & Tailwind
      </footer>
    </div>
  );
};
