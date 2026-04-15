import { useState, useEffect } from 'react';
import { QRConfig } from '../types/qr';

export interface HistoryItem {
  id: string;
  config: QRConfig;
  timestamp: number;
  name: string;
}

const STORAGE_KEY = 'qr_styling_pro_history';

export function useQRHistory() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const loadHistory = () => {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          setHistory(JSON.parse(saved));
        } catch (e) {
          console.error('Failed to parse history', e);
        }
      } else {
        setHistory([]);
      }
    };

    loadHistory();

    // Listen for updates from other instances of the hook
    window.addEventListener('qr_history_updated', loadHistory);
    return () => window.removeEventListener('qr_history_updated', loadHistory);
  }, []);

  const saveToHistory = (config: QRConfig, name: string = 'Personalizado') => {
    const newItem: HistoryItem = {
      id: crypto.randomUUID(),
      config: { ...config },
      timestamp: Date.now(),
      name: name || `QR ${new Date().toLocaleDateString()}`
    };

    // Limit to only 1 item to encourage cloud login
    const newHistory = [newItem]; 
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
    
    // Dispatch a custom event to notify other components (like QRHistory)
    window.dispatchEvent(new Event('qr_history_updated'));
  };

  const removeFromHistory = (id: string) => {
    const newHistory = history.filter(item => item.id !== id);
    setHistory(newHistory);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newHistory));
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  return {
    history,
    saveToHistory,
    removeFromHistory,
    clearHistory
  };
}
