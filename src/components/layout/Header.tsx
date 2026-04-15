import React from 'react';
import { Github } from 'lucide-react';
import { LoginButton } from '../auth/LoginButton';

export const Header: React.FC = () => {
  return (
    <header className="bg-[#1a1a1a] text-white h-16 flex items-center justify-between px-6 shadow-lg border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-3 font-bold text-xl tracking-tighter">
          <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-1.5 rounded-lg shadow-inner">
            <div className="w-6 h-6 bg-white rounded-md flex items-center justify-center text-[#1a1a1a] text-[10px] font-black">QR</div>
          </div>
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">QR Code Styling</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6 text-sm font-medium">
        <div className="hidden md:flex items-center gap-6">
          <a 
            href="https://github.com/kozakdenys/qr-code-styling" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-gray-300 transition-colors"
          >
            <Github size={16} />
            <span>GitHub</span>
          </a>
        </div>
        <LoginButton />
      </div>
    </header>
  );
};
