import { useState } from "react";
import { getWebSocket } from "../services/websocketService";
import type { User } from "@/features/auth";

interface AddMessageFormProps {
  user: User | null;
  onSendMessage: (text: string) => void;
}

export function AddMessageForm({ onSendMessage }: AddMessageFormProps) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (!text.trim()) return;
    onSendMessage(text); //add message

    const ws = getWebSocket(); //send message to the server
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(text);
    } else {
      console.error("WebSocket is not open. State:", ws?.readyState);
    }

    setText("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-bord px-3 md:px-6 py-3 md:py-4 bg-white">
      <div className="flex gap-2 md:gap-3 items-end">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type your message..."
          className="flex-1 resize-none bg-gray-button border border-contrast-bord rounded-lg 
          px-3 md:px-4 py-2 md:py-3 text-sm text-dark placeholder:text-gray-custom outline-none
           focus:border-red focus:ring-1 transition-colors min-h-[44px] max-h-32"
          rows={1}
        />

        <button
          onClick={handleSend}
          disabled={!text.trim()}
          className="bg-red text-white px-4 md:px-6 py-3 rounded-lg 
          text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed h-[44px]"
        >
          Send
        </button>
      </div>

      <p className="text-xs text-gray-custom mt-2 hidden md:block">
        Press Enter to send, Shift+Enter for new line
      </p>
    </div>
  );
}
