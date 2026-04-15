/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MainLayout } from './components/layout/MainLayout';
import { QROptions } from './components/qr/QROptions';
import { DotsOptions } from './components/qr/DotsOptions';
import { CornersOptions } from './components/qr/CornersOptions';
import { BackgroundOptions } from './components/qr/BackgroundOptions';
import { ImageOptions } from './components/qr/ImageOptions';
import { QRPreview } from './components/qr/QRPreview';
import { QRHistory } from './components/qr/QRHistory';
import { SavedConfigs } from './components/qr/SavedConfigs';
import { QRConfig, DEFAULT_QR_CONFIG } from './types/qr';
import { ChevronDown, ChevronRight, FileJson, Cloud, Save, X } from 'lucide-react';
import { useAuth } from './components/auth/AuthProvider';
import { saveQRCode } from './services/qrService';
import { motion, AnimatePresence } from 'motion/react';

type Section = 'main' | 'dots' | 'corners' | 'background' | 'image';

export default function App() {
  const [config, setConfig] = useState<QRConfig>(DEFAULT_QR_CONFIG);
  const [openSection, setOpenSection] = useState<Section | null>('main');
  const [isSaving, setIsSaving] = useState(false);
  const [saveName, setSaveName] = useState('');
  const [showSaveModal, setShowSaveModal] = useState(false);
  const { user, signIn } = useAuth();

  const toggleSection = (section: Section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const exportToJson = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(config, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "qr-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleSaveToCloud = async () => {
    if (!user) {
      signIn();
      return;
    }
    setShowSaveModal(true);
  };

  const confirmSave = async () => {
    if (!saveName.trim()) return;
    setIsSaving(true);
    try {
      await saveQRCode(saveName, config);
      setShowSaveModal(false);
      setSaveName('');
    } catch (error) {
      console.error('Error saving QR code:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* Left Side: Accordion Options */}
        <div className="w-full lg:w-[600px] space-y-2">
          
          {/* Main Options */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <button 
              onClick={() => toggleSection('main')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-white/30 transition-colors"
            >
              <span>Main Options</span>
              {openSection === 'main' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'main' && (
              <div className="p-6 border-t border-gray-100">
                <QROptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Dots Options */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <button 
              onClick={() => toggleSection('dots')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-white/30 transition-colors"
            >
              <span>Dots Options</span>
              {openSection === 'dots' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'dots' && (
              <div className="p-6 border-t border-gray-100">
                <DotsOptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Corners Options */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <button 
              onClick={() => toggleSection('corners')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-white/30 transition-colors"
            >
              <span>Corners Options</span>
              {openSection === 'corners' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'corners' && (
              <div className="p-6 border-t border-gray-100">
                <CornersOptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Background Options */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <button 
              onClick={() => toggleSection('background')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-white/30 transition-colors"
            >
              <span>Background Options</span>
              {openSection === 'background' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'background' && (
              <div className="p-6 border-t border-gray-100">
                <BackgroundOptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Image Options */}
          <div className="glass-card rounded-2xl overflow-hidden">
            <button 
              onClick={() => toggleSection('image')}
              className="w-full flex items-center justify-between px-6 py-4 text-left font-semibold text-gray-700 hover:bg-white/30 transition-colors"
            >
              <span>Image Options</span>
              {openSection === 'image' ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
            </button>
            {openSection === 'image' && (
              <div className="p-6 border-t border-gray-100">
                <ImageOptions config={config} onChange={setConfig} />
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button 
              onClick={exportToJson}
              className="flex items-center justify-center gap-2 px-6 py-4 glass-card rounded-xl font-bold text-gray-700 hover:bg-white/50 transition-all active:scale-[0.98]"
            >
              <FileJson size={20} />
              Export JSON
            </button>
            <button 
              onClick={handleSaveToCloud}
              className="flex items-center justify-center gap-2 px-6 py-4 bg-blue-600/90 backdrop-blur-sm text-white rounded-xl font-bold hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]"
            >
              <Cloud size={20} />
              Save to Cloud
            </button>
          </div>

          {/* Saved History */}
          <div className="space-y-6">
            {!user && <QRHistory onLoadConfig={setConfig} />}
            <SavedConfigs onApply={setConfig} />
          </div>
        </div>

        {/* Right Side: QR Code Preview */}
        <div className="flex-1 w-full sticky top-24">
          <div className="glass-card rounded-3xl p-10 flex flex-col items-center justify-center min-h-[500px]">
            <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-8">Live Preview</h3>
            <QRPreview config={config} />
          </div>
        </div>
      </div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="glass-card rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border-white/30"
            >
              <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/30">
                <h3 className="font-bold text-gray-800 flex items-center gap-2">
                  <Save size={20} className="text-blue-600" />
                  Save Style to Cloud
                </h3>
                <button onClick={() => setShowSaveModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X size={20} />
                </button>
              </div>
              <div className="p-6 space-y-4">
                <p className="text-sm text-gray-600">Give your style a name to find it later in your history.</p>
                <input 
                  type="text"
                  placeholder="e.g., My Professional Style"
                  value={saveName}
                  onChange={(e) => setSaveName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl glass-input outline-none transition-all"
                  autoFocus
                />
                <div className="flex gap-3 pt-2">
                  <button 
                    onClick={() => setShowSaveModal(false)}
                    className="flex-1 px-6 py-3 glass-card rounded-xl font-bold text-gray-600 hover:bg-white/50 transition-all"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={confirmSave}
                    disabled={!saveName.trim() || isSaving}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-500/20"
                  >
                    {isSaving ? 'Saving...' : 'Save Now'}
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </MainLayout>
  );
}
