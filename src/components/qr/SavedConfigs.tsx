import { useState, useEffect } from 'react';
import { useAuth } from '../auth/AuthProvider';
import { subscribeToUserQRCodes, deleteQRCode, SavedQR } from '../../services/qrService';
import { QRConfig } from '../../types/qr';
import { Trash2, Play, Clock, History } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface SavedConfigsProps {
  onApply: (config: QRConfig) => void;
}

export function SavedConfigs({ onApply }: SavedConfigsProps) {
  const { user } = useAuth();
  const [savedQRs, setSavedQRs] = useState<SavedQR[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      setSavedQRs([]);
      return;
    }

    const unsubscribe = subscribeToUserQRCodes((qrs) => {
      setSavedQRs(qrs);
    });

    return () => unsubscribe();
  }, [user]);

  if (!user) return null;

  return (
    <div className="mt-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6 py-4 glass-card rounded-xl font-semibold text-gray-700 hover:bg-white/50 transition-all"
      >
        <div className="flex items-center gap-2">
          <History size={20} className="text-blue-600" />
          <span>Your Saved Styles ({savedQRs.length})</span>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <Clock size={18} className="text-gray-400" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pt-2 space-y-2">
              {savedQRs.length === 0 ? (
                <div className="p-8 text-center glass-card rounded-xl border-white/20">
                  <p className="text-sm text-gray-500">No saved styles yet. Create one and save it!</p>
                </div>
              ) : (
                savedQRs.map((qr) => (
                  <div
                    key={qr.id}
                    className="flex items-center justify-between p-4 glass-card rounded-xl hover:bg-white/40 transition-all group"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-gray-800">{qr.name}</span>
                      <span className="text-xs text-gray-400">
                        {qr.createdAt?.toDate().toLocaleDateString()} {qr.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onApply(qr.config)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="Apply this style"
                      >
                        <Play size={18} fill="currentColor" />
                      </button>
                      <button
                        onClick={() => deleteQRCode(qr.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
