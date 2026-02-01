import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Chat {
  id: string;
  title: string;
  preview: string;
  timestamp: string;
}

interface ChatSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export default function ChatSidebar({ isOpen, onToggle }: ChatSidebarProps) {
  const [chats] = useState<Chat[]>([
    {
      id: '1',
      title: 'Анализ данных о продажах',
      preview: 'Помоги проанализировать данные...',
      timestamp: '2 часа назад'
    },
    {
      id: '2',
      title: 'Поиск информации о AI',
      preview: 'Найди последние новости про...',
      timestamp: 'Вчера'
    },
    {
      id: '3',
      title: 'Генерация кода Python',
      preview: 'Создай функцию для обработки...',
      timestamp: '3 дня назад'
    }
  ]);

  return (
    <>
      <button
        onClick={onToggle}
        className="fixed top-20 left-4 z-50 p-2 rounded-lg glass-effect hover:neon-glow-cyan transition-all lg:hidden"
      >
        <Icon name={isOpen ? "X" : "Menu"} size={24} className="text-[#00d4ff]" />
      </button>

      <aside
        className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-80 
          glass-effect border-r border-white/10 
          transition-transform duration-300 z-40
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="p-4 flex flex-col h-full">
          <Button
            className="w-full gradient-neon hover:opacity-90 text-white font-semibold mb-4"
          >
            <Icon name="Plus" size={20} className="mr-2" />
            Новый чат
          </Button>

          <ScrollArea className="flex-1">
            <div className="space-y-2">
              {chats.map((chat) => (
                <div
                  key={chat.id}
                  className="p-3 rounded-lg hover:bg-white/5 cursor-pointer transition-all group border border-transparent hover:border-[#00d4ff]/30"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-medium text-sm text-white/90 group-hover:text-[#00d4ff] transition-colors">
                      {chat.title}
                    </h3>
                    <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Icon name="Trash2" size={14} className="text-red-400" />
                    </button>
                  </div>
                  <p className="text-xs text-white/50 truncate">{chat.preview}</p>
                  <p className="text-xs text-white/30 mt-1">{chat.timestamp}</p>
                </div>
              ))}
            </div>
          </ScrollArea>

          <div className="mt-4 pt-4 border-t border-white/10">
            <button className="w-full p-3 rounded-lg hover:bg-white/5 flex items-center gap-3 text-sm text-white/70 hover:text-white transition-colors">
              <Icon name="Settings" size={18} className="text-[#ff00ff]" />
              Настройки
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
