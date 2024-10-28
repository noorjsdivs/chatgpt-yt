import Chat from "@/src/components/Chat";
import ChatInput from "@/src/components/ChatInput";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const ChatPage = ({ params: { id } }: Props) => {
  return (
    <div className="flex flex-col justify-center h-[100%] p-5 overflow-hidden">
      <div className="flex-1 overflow-y-scroll pt-10 md:pt-5">
        <Chat id={id} />
      </div>
      <ChatInput id={id} />
    </div>
  );
};

export default ChatPage;
