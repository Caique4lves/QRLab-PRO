import React from 'react';
import { QRConfig } from '../../types/qr';
import { Palette, Square } from 'lucide-react';

interface CornersOptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const CornersOptions: React.FC<CornersOptionsProps> = ({ config, onChange }) => {
  const squareTypes = ['square', 'dot', 'extra-rounded'];
  const dotTypes = ['square', 'dot'];

  return (
    <div className="space-y-8">
      {/* Corners Square */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Corners Square</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Palette size={16} className="text-gray-400" />
            Color
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={config.cornersSquareOptions.color}
              onChange={(e) => onChange({
                ...config,
                cornersSquareOptions: { ...config.cornersSquareOptions, color: e.target.value }
              })}
              className="w-10 h-10 rounded cursor-pointer border-none p-0"
            />
            <input
              type="text"
              value={config.cornersSquareOptions.color}
              onChange={(e) => onChange({
                ...config,
                cornersSquareOptions: { ...config.cornersSquareOptions, color: e.target.value }
              })}
              className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {squareTypes.map((type) => (
            <button
              key={type}
              onClick={() => onChange({
                ...config,
                cornersSquareOptions: { ...config.cornersSquareOptions, type: type as any }
              })}
              className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                config.cornersSquareOptions.type === type
                  ? 'bg-[#333333] text-white border-[#333333]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
              }`}
            >
              {type.charAt(0).toUpperCase() + type.slice(1).replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Corners Dot */}
      <div className="space-y-4">
        <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Corners Dot</h3>
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Palette size={16} className="text-gray-400" />
            Color
          </label>
          <div className="flex gap-3 items-center">
            <input
              type="color"
              value={config.cornersDotOptions.color}
              onChange={(e) => onChange({
                ...config,
                cornersDotOptions: { ...config.cornersDotOptions, color: e.target.value }
              })}
              className="w-10 h-10 rounded cursor-pointer border-none p-0"
            />
            <input
              type="text"
              value={config.cornersDotOptions.color}
              onChange={(e) => onChange({
                ...config,
                cornersDotOptions: { ...config.cornersDotOptions, color: e.target.value }
              })}
              className="flex-1 px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none text-sm"
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {dotTypes.map((type) => (
            <button
              key={type}
              onClick={() => onChange({
                ...config,
                cornersDotOptions: { ...config.cornersDotOptions, type: type as any }
              })}
              className={`px-3 py-2 text-xs rounded-lg border transition-all ${
                config.cornersDotOptions.type === type
                  ? 'bg-[#333333] text-white border-[#333333]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300'
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
