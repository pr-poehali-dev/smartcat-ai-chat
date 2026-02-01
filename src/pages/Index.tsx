import { useState, useRef, useEffect } from 'react';
import ChatHeader from '@/components/ChatHeader';
import ChatSidebar from '@/components/ChatSidebar';
import ChatMessage from '@/components/ChatMessage';
import ChatInput from '@/components/ChatInput';
import TypingIndicator from '@/components/TypingIndicator';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
}

export default function Index() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Привет! Я SmartCat AI — твой умный ассистент для поиска и анализа информации. Задай мне любой вопрос или запроси поиск в интернете! 🐱✨',
      timestamp: 'Только что'
    }
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
      timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: `Я получил твой запрос: "${content}". Это демо-версия SmartCat AI. Для полной интеграции с LongCat API нужно настроить backend функцию! 🚀`,
        timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsTyping(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0a0a]">
      <ChatHeader />
      
      <div className="flex flex-1 overflow-hidden">
        <ChatSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="flex-1 flex flex-col relative">
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto px-4 py-6"
          >
            <div className="container mx-auto max-w-4xl">
              {messages.length === 0 && (
                <div className="flex items-center justify-center h-full">
                  <div className="text-center space-y-4 animate-fade-in">
                    <div className="w-20 h-20 mx-auto rounded-2xl gradient-neon flex items-center justify-center text-4xl animate-pulse-glow">
                      🐱
                    </div>
                    <h2 className="text-3xl font-bold bg-gradient-to-r from-[#00d4ff] to-[#ff00ff] bg-clip-text text-transparent">
                      SmartCat AI
                    </h2>
                    <p className="text-white/60">Задай вопрос или запроси поиск информации</p>
                  </div>
                </div>
              )}

              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                />
              ))}

              {isTyping && <TypingIndicator />}
            </div>
          </div>

          <ChatInput onSend={handleSendMessage} disabled={isTyping} />
        </main>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-[#00d4ff] opacity-10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#ff00ff] opacity-10 blur-[120px] rounded-full"></div>
      </div>
    </div>
  );
}
