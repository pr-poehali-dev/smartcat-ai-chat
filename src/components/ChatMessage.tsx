interface ChatMessageProps {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export default function ChatMessage({ role, content, timestamp }: ChatMessageProps) {
  const isUser = role === 'user';

  return (
    <div className={`flex gap-4 mb-6 animate-fade-in ${isUser ? 'flex-row-reverse' : ''}`}>
      <div
        className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
          isUser
            ? 'bg-gradient-to-br from-[#ff00ff] to-[#00d4ff]'
            : 'glass-effect border border-[#00d4ff]/30'
        }`}
      >
        <span className="text-xl">{isUser ? '👤' : '🐱'}</span>
      </div>

      <div className={`flex-1 max-w-2xl ${isUser ? 'text-right' : ''}`}>
        <div
          className={`inline-block p-4 rounded-2xl ${
            isUser
              ? 'bg-gradient-to-br from-[#00d4ff]/20 to-[#ff00ff]/20 border border-[#00d4ff]/30'
              : 'glass-effect border border-white/10'
          }`}
        >
          <p className="text-white/90 leading-relaxed">{content}</p>
        </div>
        {timestamp && (
          <p className="text-xs text-white/30 mt-2 px-2">{timestamp}</p>
        )}
      </div>
    </div>
  );
}
