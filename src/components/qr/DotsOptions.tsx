import React from 'react';
import { QRConfig } from '../../types/qr';
import { Palette, Shapes } from 'lucide-react';

interface DotsOptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const DotsOptions: React.FC<DotsOptionsProps> = ({ config, onChange }) => {
  const types = ['square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Palette size={16} className="text-gray-400" />
          Dots Color
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="color"
            value={config.dotsOptions.color}
            onChange={(e) => onChange({
              ...config,
              dotsOptions: { ...config.dotsOptions, color: e.target.value }
            })}
            className="w-12 h-12 rounded cursor-pointer border-none p-0"
          />
          <input
            type="text"
            value={config.dotsOptions.color}
            onChange={(e) => onChange({
              ...config,
              dotsOptions: { ...config.dotsOptions, color: e.target.value }
            })}
            className="flex-1 px-4 py-2 glass-input rounded-lg outline-none"
          />
        </div>
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Shapes size={16} className="text-gray-400" />
          Dots Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {types.map((type) => (
            <button
              key={type}
              onClick={() => onChange({
                ...config,
                dotsOptions: { ...config.dotsOptions, type: type as any }
              })}
              className={`px-4 py-2 text-sm rounded-lg border transition-all ${
                config.dotsOptions.type === type
                  ? 'bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20'
                  : 'bg-white/50 backdrop-blur-sm text-gray-600 border-white/30 hover:bg-white/80'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
