import React from 'react';
import { Trash2, Clock, ExternalLink } from 'lucide-react';
import { useQRHistory, HistoryItem } from '../../hooks/useQRHistory';
import { QRConfig } from '../../types/qr';

interface QRHistoryProps {
  onLoadConfig: (config: QRConfig) => void;
}

export const QRHistory: React.FC<QRHistoryProps> = ({ onLoadConfig }) => {
  const { history, removeFromHistory, clearHistory } = useQRHistory();

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 px-4 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 mb-4">
          <Clock size={24} />
        </div>
        <h3 className="text-gray-900 font-bold mb-1">Histórico Vazio</h3>
        <p className="text-gray-500 text-sm max-w-[200px]">
          Suas personalizações salvas aparecerão aqui.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <Clock size={18} className="text-blue-600" />
          Histórico Local
        </h3>
        <button 
          onClick={clearHistory}
          className="text-xs text-red-500 hover:text-red-600 font-medium transition-colors"
        >
          Limpar
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {history.map((item: HistoryItem) => (
          <div 
            key={item.id}
            className="group bg-white border border-gray-100 p-3 rounded-xl shadow-sm hover:shadow-md hover:border-blue-100 transition-all flex items-center justify-between"
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600 shrink-0">
                <div className="w-6 h-6 border-2 border-blue-600 rounded-[2px] flex items-center justify-center text-[8px] font-black">QR</div>
              </div>
              <div className="overflow-hidden">
                <h4 className="text-sm font-bold text-gray-900 truncate">{item.name}</h4>
                <p className="text-[10px] text-gray-400 truncate">
                  {new Date(item.timestamp).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onLoadConfig(item.config)}
                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                title="Carregar"
              >
                <ExternalLink size={16} />
              </button>
              <button
                onClick={() => removeFromHistory(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                title="Excluir"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-blue-50 p-3 rounded-xl border border-blue-100">
        <p className="text-[10px] text-blue-700 font-medium leading-relaxed">
          💡 <strong>Limite de 1 item:</strong> O histórico local é limitado. Conecte sua conta para salvar QR Codes ilimitados na nuvem!
        </p>
      </div>
    </div>
  );
};
