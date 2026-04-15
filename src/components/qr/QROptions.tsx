import React from 'react';
import { QRConfig } from '../../types/qr';
import { Link, Image as ImageIcon, Maximize, Move } from 'lucide-react';

interface QROptionsProps {
  config: QRConfig;
  onChange: (newConfig: QRConfig) => void;
}

export const QROptions: React.FC<QROptionsProps> = ({ config, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    onChange({
      ...config,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange({
          ...config,
          image: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Data Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <Link size={16} className="text-gray-400" />
          Data
        </label>
        <input
          type="text"
          name="data"
          value={config.data}
          onChange={handleInputChange}
          placeholder="https://example.com"
          className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#333333] focus:border-transparent outline-none transition-all"
        />
      </div>

      {/* Image File Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
          <ImageIcon size={16} className="text-gray-400" />
          Image File
        </label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-gray-100 file:text-gray-700
              hover:file:bg-gray-200 transition-all cursor-pointer"
          />
          {config.image && (
            <button 
              onClick={() => onChange({ ...config, image: null })}
              className="text-xs text-red-500 hover:underline"
            >
              Remove
            </button>
          )}
        </div>
      </div>

      {/* Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Width */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Maximize size={16} className="text-gray-400" />
            Width
          </label>
          <input
            type="number"
            name="width"
            value={config.width}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#333333] focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Height */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Maximize size={16} className="text-gray-400" />
            Height
          </label>
          <input
            type="number"
            name="height"
            value={config.height}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#333333] focus:border-transparent outline-none transition-all"
          />
        </div>

        {/* Margin */}
        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
            <Move size={16} className="text-gray-400" />
            Margin
          </label>
          <input
            type="number"
            name="margin"
            value={config.margin}
            onChange={handleInputChange}
            className="w-full px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#333333] focus:border-transparent outline-none transition-all"
          />
        </div>
      </div>
    </div>
  );
};
