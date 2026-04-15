import React, { useEffect, useRef } from 'react';
import QRCodeStyling from 'qr-code-styling';
import { QRConfig } from '../../types/qr';
import { Download, History, Save } from 'lucide-react';
import { useQRHistory } from '../../hooks/useQRHistory';

interface QRPreviewProps {
  config: QRConfig;
  hideUI?: boolean;
}

export const QRPreview: React.FC<QRPreviewProps> = ({ config, hideUI = false }) => {
  const { saveToHistory } = useQRHistory();
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCode = useRef<QRCodeStyling>(new QRCodeStyling({
    width: config.width,
    height: config.height,
    data: config.data,
    margin: config.margin,
    image: config.image || undefined,
    dotsOptions: config.dotsOptions,
    backgroundOptions: config.backgroundOptions,
    imageOptions: {
      ...config.imageOptions,
      imageSize: config.imageOptions.imageSize
    },
  }));

  useEffect(() => {
    if (qrRef.current) {
      qrCode.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    qrCode.current.update({
      width: config.width,
      height: config.height,
      data: config.data,
      margin: config.margin,
      image: config.image || undefined,
      dotsOptions: config.dotsOptions,
      backgroundOptions: config.backgroundOptions,
      imageOptions: {
        ...config.imageOptions,
        imageSize: config.imageOptions.imageSize
      },
      cornersSquareOptions: config.cornersSquareOptions,
      cornersDotOptions: config.cornersDotOptions,
    });
  }, [config]);

  const onDownload = (extension: 'png' | 'jpeg' | 'webp' | 'svg') => {
    qrCode.current.download({
      extension: extension,
    });
  };

  const handleSave = () => {
    saveToHistory(config);
    // Optional: Add a toast or feedback here
  };

  if (hideUI) {
    return <div ref={qrRef} className="flex items-center justify-center overflow-hidden" />;
  }

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <div className="flex flex-col items-center gap-8 w-full animate-in fade-in zoom-in-95 duration-300">
        <div 
          ref={qrRef} 
          className="bg-white p-6 rounded-2xl shadow-2xl shadow-blue-500/5 border border-gray-100 flex items-center justify-center overflow-hidden max-w-full"
        />
        
        <div className="flex flex-wrap justify-center gap-3 w-full">
          <button
            onClick={() => onDownload('png')}
            className="flex items-center gap-2 px-6 py-3 bg-[#1a1a1a] text-white rounded-xl hover:bg-black transition-all text-sm font-bold shadow-lg shadow-black/10 active:scale-95"
          >
            <Download size={18} />
            Baixar PNG
          </button>
          <button
            onClick={() => onDownload('svg')}
            className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all text-sm font-bold active:scale-95"
          >
            <Download size={18} />
            Baixar SVG
          </button>
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all text-sm font-bold shadow-lg shadow-blue-200 active:scale-95"
          >
            <Save size={18} />
            Salvar no Histórico
          </button>
        </div>
      </div>
    </div>
  );
};
