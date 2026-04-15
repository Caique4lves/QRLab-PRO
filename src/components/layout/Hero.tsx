import React from 'react';
import { QRPreview } from '../qr/QRPreview';
import { QRConfig } from '../../types/qr';
import { motion } from 'motion/react';

const DECORATIVE_QR_LEFT: QRConfig = {
  data: 'https://qr-code-styling.com',
  image: null,
  width: 200,
  height: 200,
  margin: 10,
  dotsOptions: { color: '#3b82f6', type: 'rounded' },
  cornersSquareOptions: { color: '#60a5fa', type: 'extra-rounded' },
  cornersDotOptions: { color: '#ffffff', type: 'dot' },
  backgroundOptions: { color: '#1a1a1a' },
  imageOptions: { crossOrigin: 'anonymous', margin: 0, imageSize: 0.4 },
};

const DECORATIVE_QR_RIGHT: QRConfig = {
  data: 'https://qr-code-styling.com',
  image: null,
  width: 200,
  height: 200,
  margin: 10,
  dotsOptions: { color: '#ffffff', type: 'classy' },
  cornersSquareOptions: { color: '#3b82f6', type: 'dot' },
  cornersDotOptions: { color: '#60a5fa', type: 'square' },
  backgroundOptions: { color: '#1a1a1a' },
  imageOptions: { crossOrigin: 'anonymous', margin: 0, imageSize: 0.4 },
};

export const Hero: React.FC = () => {
  return (
    <section 
      className="w-full py-20 px-6 md:px-12 mb-8 relative overflow-hidden"
      style={{ 
        background: 'radial-gradient(circle at center, #1a1a1a 0%, #000000 100%)' 
      }}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </div>

      <div className="container mx-auto max-w-7xl relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          {/* Left Decorative QR */}
          <motion.div 
            initial={{ opacity: 0, x: -50, rotate: -10 }}
            animate={{ opacity: 0.8, x: 0, rotate: -15 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="hidden lg:block bg-[#1a1a1a] p-2 rounded-2xl shadow-2xl border border-white/5"
          >
            <QRPreview config={DECORATIVE_QR_LEFT} hideUI />
          </motion.div>

          {/* Centered Content */}
          <div className="flex-1 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-black mb-6 tracking-tighter text-white">
                QR Code <span className="text-blue-500">Styling</span>
              </h1>
              <div className="space-y-2">
                <p className="text-xl md:text-2xl font-light text-gray-300">
                  An open source JS library
                </p>
                <p className="text-xl md:text-2xl font-medium text-blue-400/80 italic">
                  For generating styled QR codes
                </p>
              </div>
              
              <div className="mt-10 flex justify-center">
                <div className="h-1 w-32 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.5)]"></div>
              </div>
            </motion.div>
          </div>

          {/* Right Decorative QR */}
          <motion.div 
            initial={{ opacity: 0, x: 50, rotate: 10 }}
            animate={{ opacity: 0.8, x: 0, rotate: 15 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="hidden lg:block bg-[#1a1a1a] p-2 rounded-2xl shadow-2xl border border-white/5"
          >
            <QRPreview config={DECORATIVE_QR_RIGHT} hideUI />
          </motion.div>

        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#f5f5f5] to-transparent"></div>
    </section>
  );
};
