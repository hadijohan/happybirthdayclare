/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Gift, 
  Mail, 
  Disc, 
  Play, 
  Pause, 
  ExternalLink, 
  X, 
  Heart,
  Music,
  Coins
} from 'lucide-react';

// --- Components ---

const Letter = ({ onClose }: { onClose: () => void }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0, y: 20 }}
    animate={{ scale: 1, opacity: 1, y: 0 }}
    exit={{ scale: 0.8, opacity: 0, y: 20 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm"
    onClick={onClose}
  >
    <motion.div 
      className="bg-[#fff9e6] p-8 max-w-md w-full shadow-2xl border-2 border-[#d4c5a1] relative floral-pattern"
      onClick={(e) => e.stopPropagation()}
    >
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 text-[#8b7355] hover:text-black transition-colors"
      >
        <X size={24} />
      </button>
      <div className="font-serif text-lg leading-relaxed text-[#5d4a37]">
        <p className="mb-4 italic">Dearest Friend,</p>
        <p className="mb-4">
          I hope this little digital package finds you well. In a world that moves so fast, 
          I wanted to share a slice of nostalgia and warmth with you.
        </p>
        <p className="mb-4">
          Inside, you'll find a few of my favorite things: a playlist for rainy afternoons, 
          a small token of luck, and this note.
        </p>
        <p className="mb-8">
          May your day be filled with small wonders and gentle moments.
        </p>
        <p className="text-right font-semibold">With love, <br/> Your Secret Admirer</p>
      </div>
      <div className="mt-8 flex justify-center">
        <Heart className="text-pink-400 fill-pink-400 animate-pulse" />
      </div>
    </motion.div>
  </motion.div>
);

const CDPlayer = ({ isInserted, isPlaying, onPlayToggle, cdRef }: { 
  isInserted: boolean, 
  isPlaying: boolean, 
  onPlayToggle: () => void,
  cdRef: React.RefObject<HTMLDivElement | null>
}) => {
  return (
    <div className="relative w-64 h-64 bg-zinc-300 rounded-full shadow-inner border-4 border-zinc-400 flex items-center justify-center overflow-hidden group">
      {/* CD Player Body */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-200 to-zinc-400 opacity-50" />
      
      {/* Window */}
      <div className="w-48 h-48 rounded-full bg-zinc-800/80 border-4 border-zinc-500 flex items-center justify-center relative overflow-hidden">
        {isInserted && (
          <motion.div 
            initial={{ scale: 0, rotate: 0 }}
            animate={{ 
              scale: 1, 
              rotate: isPlaying ? 360 : 0 
            }}
            transition={{ 
              rotate: { duration: 3, repeat: Infinity, ease: "linear" },
              scale: { duration: 0.5 }
            }}
            className="w-40 h-40 rounded-full iridescent border-2 border-white/30 flex items-center justify-center"
          >
            <div className="w-8 h-8 rounded-full bg-zinc-800 border-2 border-white/50" />
          </motion.div>
        )}
        {!isInserted && (
          <div className="text-zinc-500 font-pixel text-sm uppercase tracking-widest text-center">
            Insert Disc
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 flex gap-4">
        <button 
          onClick={onPlayToggle}
          disabled={!isInserted}
          className={`p-2 rounded-full border-2 transition-all ${
            isInserted 
              ? 'bg-zinc-100 border-zinc-400 text-zinc-700 hover:bg-white active:scale-95' 
              : 'bg-zinc-200 border-zinc-300 text-zinc-400 cursor-not-allowed'
          }`}
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* Brand Name */}
      <div className="absolute top-6 font-pixel text-zinc-600 text-[10px] tracking-tighter opacity-50">
        CYBER-AUDIO V.2000
      </div>
    </div>
  );
};

const MoneyPacket = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => (
  <motion.div 
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.8, opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
    onClick={onClose}
  >
    <motion.div 
      className="bg-red-600 p-1 w-full max-w-xs rounded-lg shadow-2xl border-4 border-yellow-400"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="bg-red-700 p-6 rounded-md border-2 border-yellow-500/50 flex flex-col items-center text-center">
        <div className="mb-4 text-yellow-400">
          <Coins size={48} />
        </div>
        <h2 className="text-yellow-400 font-pixel text-2xl mb-4 uppercase tracking-widest">Selamat Hari Raya</h2>
        
        {/* QR Placeholder */}
        <div className="w-40 h-40 bg-white p-2 mb-6 rounded-sm">
          <img 
            src="https://picsum.photos/seed/qr/200/200" 
            alt="QR Code" 
            className="w-full h-full object-cover grayscale"
            referrerPolicy="no-referrer"
          />
        </div>

        <p className="text-yellow-100 font-serif italic mb-6">
          "May prosperity and joy bloom in your path."
        </p>

        <a 
          href="https://example.com" 
          target="_blank" 
          rel="noopener noreferrer"
          className="bg-yellow-400 text-red-800 px-6 py-2 rounded-full font-bold hover:bg-yellow-300 transition-colors flex items-center gap-2"
        >
          Claim Reward <ExternalLink size={16} />
        </a>
      </div>
    </motion.div>
  </motion.div>
);

export default function App() {
  const [isBoxOpen, setIsBoxOpen] = useState(false);
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [cdInserted, setCdInserted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const cdPlayerRef = useRef<HTMLDivElement>(null);

  const handleOpenBox = () => {
    setIsBoxOpen(true);
  };

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      // Open Spotify link after a short delay to simulate "loading"
      setTimeout(() => {
        window.open('https://open.spotify.com/playlist/37i9dQZF1DX4sWSp4KmOR3', '_blank');
      }, 1000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 opacity-20 pointer-events-none">
        <div className="absolute top-10 left-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-cyan-200 rounded-full blur-3xl" />
      </div>

      <AnimatePresence mode="wait">
        {!isBoxOpen ? (
          <motion.div 
            key="closed-box"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0, y: -100 }}
            className="flex flex-col items-center gap-8"
          >
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpenBox}
              className="cursor-pointer relative"
            >
              <div className="w-64 h-64 bg-white border-8 border-pink-200 rounded-3xl shadow-2xl flex items-center justify-center relative overflow-hidden floral-pattern">
                <div className="absolute inset-0 bg-gradient-to-tr from-pink-100/50 to-transparent" />
                <Gift size={120} className="text-pink-400 drop-shadow-lg" />
                
                {/* Ribbon */}
                <div className="absolute top-1/2 left-0 w-full h-8 bg-pink-400 -translate-y-1/2 shadow-md" />
                <div className="absolute left-1/2 top-0 h-full w-8 bg-pink-400 -translate-x-1/2 shadow-md" />
              </div>
              
              {/* Sparkles */}
              <motion.div 
                animate={{ opacity: [0, 1, 0], scale: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -right-4 text-yellow-400"
              >
                <Heart size={32} fill="currentColor" />
              </motion.div>
            </motion.div>
            
            <div className="text-center">
              <h1 className="font-pixel text-4xl text-pink-500 mb-2 uppercase tracking-widest drop-shadow-sm">
                Open Your Gift
              </h1>
              <p className="font-serif italic text-zinc-500">A little something for you...</p>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="open-box"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="w-full max-w-4xl flex flex-col items-center gap-12"
          >
            <header className="text-center">
              <h2 className="font-pixel text-3xl text-zinc-700 uppercase tracking-widest mb-2">
                Digital Treasures
              </h2>
              <div className="h-1 w-24 bg-pink-300 mx-auto rounded-full" />
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center justify-center">
              
              {/* Item 1: Envelope */}
              <motion.div 
                initial={{ x: -50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col items-center gap-4"
              >
                <div 
                  onClick={() => setActiveItem('letter')}
                  className="w-48 h-32 bg-[#fff9e6] border-2 border-[#d4c5a1] shadow-lg cursor-pointer hover:scale-105 transition-transform flex items-center justify-center relative group"
                >
                  <div className="absolute inset-0 border-t-[60px] border-t-transparent border-l-[96px] border-l-[#f2ead0] border-r-[96px] border-r-[#f2ead0] border-b-[64px] border-b-[#e6ddc0]" />
                  <Mail size={40} className="text-[#8b7355] z-10 group-hover:animate-bounce" />
                </div>
                <span className="font-pixel text-sm text-zinc-500 uppercase">The Letter</span>
              </motion.div>

              {/* Item 2: CD Player & CD */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col items-center gap-8"
              >
                <div className="flex flex-col items-center gap-6">
                  <CDPlayer 
                    isInserted={cdInserted} 
                    isPlaying={isPlaying} 
                    onPlayToggle={handlePlayToggle}
                    cdRef={cdPlayerRef}
                  />
                  
                  {!cdInserted && (
                    <motion.div 
                      drag
                      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                      onDragEnd={(_, info) => {
                        // Simple logic: if dragged enough, "insert" it
                        if (Math.abs(info.offset.y) > 50 || Math.abs(info.offset.x) > 50) {
                          setCdInserted(true);
                        }
                      }}
                      whileDrag={{ scale: 1.1, zIndex: 100 }}
                      className="w-32 h-32 rounded-full iridescent border-4 border-white/50 shadow-xl flex items-center justify-center cursor-grab active:cursor-grabbing relative group"
                    >
                      <div className="w-6 h-6 rounded-full bg-white/80" />
                      <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-pixel">
                        Drag to Player
                      </div>
                      <Disc size={48} className="text-white/40 absolute" />
                    </motion.div>
                  )}
                </div>
                <span className="font-pixel text-sm text-zinc-500 uppercase">The Discman</span>
              </motion.div>

              {/* Item 3: Money Packet */}
              <motion.div 
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="flex flex-col items-center gap-4 md:col-span-2"
              >
                <div 
                  onClick={() => setActiveItem('packet')}
                  className="w-24 h-40 bg-red-600 border-2 border-yellow-400 shadow-lg cursor-pointer hover:rotate-3 transition-transform flex flex-col items-center justify-center gap-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-4 bg-yellow-400/30" />
                  <div className="text-yellow-400 font-bold text-xl">福</div>
                  <Coins size={24} className="text-yellow-400" />
                </div>
                <span className="font-pixel text-sm text-zinc-500 uppercase">Lucky Packet</span>
              </motion.div>

            </div>

            <button 
              onClick={() => setIsBoxOpen(false)}
              className="mt-8 text-zinc-400 hover:text-pink-400 transition-colors font-pixel text-xs uppercase tracking-widest"
            >
              Close Box
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modals */}
      <AnimatePresence>
        {activeItem === 'letter' && <Letter onClose={() => setActiveItem(null)} />}
        {activeItem === 'packet' && <MoneyPacket isOpen={true} onClose={() => setActiveItem(null)} />}
      </AnimatePresence>

      {/* Footer Decoration */}
      <div className="fixed bottom-4 left-4 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-pink-300" />
        <div className="w-3 h-3 rounded-full bg-cyan-300" />
        <div className="w-3 h-3 rounded-full bg-yellow-300" />
      </div>
      <div className="fixed bottom-4 right-4 font-pixel text-[10px] text-zinc-400 uppercase tracking-[0.2em]">
        Est. 2000 / Cottage Core Ed.
      </div>
    </div>
  );
}
