import type { Message as MessageType } from "../types/message";

interface MessageProps {
  message: MessageType;
}

export function Message({ message }: MessageProps) {
  const messageTime = new Date(message.timestamp).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div
      className="flex gap-2 md:gap-3 group 
    hover:bg-gray-button/50 -mx-3 md:-mx-6 px-3 md:px-6 py-2 rounded-lg transition-colors"
    >
      <img
        src={message.avatar}
        alt={message.author}
        className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0 border-2 border-gray-bord"
      />

      <div className="flex-1 min-w-0">
        <div className="flex flex-col md:flex-row md:items-baseline gap-0 md:gap-2 mb-1">
          <span className="font-semibold text-dark text-sm">
            {message.author}
          </span>
          <span className="text-xs text-gray-custom">{messageTime}</span>
        </div>

        <p className="text-sm text-dark break-words">{message.text}</p>
      </div>
    </div>
  );
}
