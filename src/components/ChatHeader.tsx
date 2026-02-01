import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

export default function ChatHeader() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <header className="glass-effect border-b border-white/10 sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg gradient-neon flex items-center justify-center text-2xl animate-pulse-glow">
            🐱
          </div>
          <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#ff00ff] bg-clip-text text-transparent">
            SmartCat AI
          </h1>
        </div>

        <div className="flex items-center gap-4">
          {searchOpen ? (
            <div className="animate-fade-in">
              <Input
                type="text"
                placeholder="Поиск по истории..."
                className="w-64 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                autoFocus
                onBlur={() => setSearchOpen(false)}
              />
            </div>
          ) : (
            <button
              onClick={() => setSearchOpen(true)}
              className="p-2 rounded-lg hover:bg-white/10 transition-all"
            >
              <Icon name="Search" size={20} className="text-[#00d4ff]" />
            </button>
          )}

          <button className="p-2 rounded-lg hover:bg-white/10 transition-all">
            <Icon name="User" size={20} className="text-[#ff00ff]" />
          </button>
        </div>
      </div>
    </header>
  );
}
