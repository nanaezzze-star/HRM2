import { useEffect } from "react";
import { createWebSocket } from "../services/websocketService";
import { Message } from "./Message";
import type { Message as MessageType } from "../types/message";

interface MessagesProps {
  messages: MessageType[];
  setMessages: React.Dispatch<React.SetStateAction<MessageType[]>>;
}

export function Messages({ messages, setMessages }: MessagesProps) {
  useEffect(() => {
    const ws = createWebSocket();

    const handleMessage = (e: MessageEvent) => {
      const newMsg: MessageType = {
        id: Date.now().toString(),
        text: e.data,
        author: "Server",
        avatar: "https://i.pravatar.cc/30",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, newMsg]);
    };

    const handleError = (error: Event) => {
      console.error("WebSocket error:", error);
    };

    ws.addEventListener("message", handleMessage);
    ws.addEventListener("error", handleError);

    return () => {
      ws.removeEventListener("message", handleMessage);
      ws.removeEventListener("error", handleError);
      ws.close();
    };
  }, [setMessages]);

  return (
    <div className="flex-1 overflow-y-auto px-3 md:px-6 py-3 md:py-4 space-y-3 md:space-y-4">
      {messages.length === 0 ? (
        <div className="flex items-center justify-center h-full text-gray-custom text-sm">
          No messages yet. Start the conversation!
        </div>
      ) : (
        messages.map((m) => <Message key={m.id} message={m} />)
      )}
    </div>
  );
}
