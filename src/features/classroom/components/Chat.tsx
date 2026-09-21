import { useState } from "react";
import { Messages } from "./Messages";
import { AddMessageForm } from "./AddMessageForm";
import type { Message as MessageType } from "../types/message";
import type { User } from "@/features/auth";

interface ChatProps {
  user: User | null;
}

export function Chat({ user }: ChatProps) {
  const [messages, setMessages] = useState<MessageType[]>([]);

  const handleAddMessage = (text: string) => {
    const userMsg: MessageType = {
      id: `user-${Date.now()}`,
      text,
      author: user ? `${user.firstName} ${user.lastName}` : "You",
      avatar: user?.avatarUrl || "https://i.pravatar.cc/30?img=5",
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMsg]);
  };

  return (
    <div className="flex flex-col h-full">
      <Messages messages={messages} setMessages={setMessages} />
      <AddMessageForm user={user} onSendMessage={handleAddMessage} />
    </div>
  );
}