export default function TypingIndicator() {
  return (
    <div className="flex gap-4 mb-6 animate-fade-in">
      <div className="w-10 h-10 rounded-lg glass-effect border border-[#00d4ff]/30 flex items-center justify-center flex-shrink-0">
        <span className="text-xl">🐱</span>
      </div>

      <div className="flex-1 max-w-2xl">
        <div className="inline-block p-4 rounded-2xl glass-effect border border-white/10">
          <div className="flex gap-2 items-center">
            <span className="text-white/70 text-sm">SmartCat печатает</span>
            <div className="flex gap-1">
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: '0ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: '150ms' }}></div>
              <div className="w-2 h-2 rounded-full bg-[#00d4ff] animate-bounce" style={{ animationDelay: '300ms' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
