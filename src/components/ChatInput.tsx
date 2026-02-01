import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSend(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-white/10 p-4 glass-effect">
      <div className="container mx-auto max-w-4xl">
        <div className="flex gap-2 mb-3">
          <Button
            size="sm"
            variant="outline"
            className="border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10"
          >
            <Icon name="Newspaper" size={16} className="mr-1" />
            Новости
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-[#ff00ff]/30 text-[#ff00ff] hover:bg-[#ff00ff]/10"
          >
            <Icon name="Search" size={16} className="mr-1" />
            Поиск в вебе
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="border-[#00d4ff]/30 text-[#00d4ff] hover:bg-[#00d4ff]/10"
          >
            <Icon name="BarChart" size={16} className="mr-1" />
            Анализ данных
          </Button>
        </div>

        <div className="relative flex items-end gap-2">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Задайте вопрос или запросите поиск..."
            className="flex-1 min-h-[60px] max-h-[200px] bg-white/5 border-white/20 text-white placeholder:text-white/40 resize-none pr-12"
            disabled={disabled}
          />
          <Button
            onClick={handleSend}
            disabled={!message.trim() || disabled}
            className="absolute right-2 bottom-2 w-10 h-10 p-0 gradient-neon hover:opacity-90 disabled:opacity-50 animate-pulse-glow"
          >
            <Icon name="Send" size={18} className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
