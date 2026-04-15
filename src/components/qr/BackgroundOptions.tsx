import React from 'react';
import { QRConfig } from '../../types/qr';
import { Palette } from 'lucide-react';

interface BackgroundOptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const BackgroundOptions: React.FC<BackgroundOptionsProps> = ({ config, onChange }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Palette size={16} className="text-gray-400" />
          Background Color
        </label>
        <div className="flex gap-3 items-center">
          <input
            type="color"
            value={config.backgroundOptions.color}
            onChange={(e) => onChange({
              ...config,
              backgroundOptions: { ...config.backgroundOptions, color: e.target.value }
            })}
            className="w-12 h-12 rounded cursor-pointer border-none p-0"
          />
          <input
            type="text"
            value={config.backgroundOptions.color}
            onChange={(e) => onChange({
              ...config,
              backgroundOptions: { ...config.backgroundOptions, color: e.target.value }
            })}
            className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none"
          />
        </div>
      </div>
    </div>
  );
};
