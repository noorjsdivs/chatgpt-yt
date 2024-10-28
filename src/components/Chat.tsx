"use client";
import { db } from "@/firebase";
import { collection, orderBy, query } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useCollection } from "react-firebase-hooks/firestore";
import Message from "./Message";
import { BsArrowDownCircle } from "react-icons/bs";
import { useEffect, useRef } from "react";

const Chat = ({ id }: { id: string }) => {
  const { data: session } = useSession();

  const userEmail = session?.user
    ? (session?.user?.email as string)
    : "unknown";
  const bottomRef = useRef<HTMLDivElement>(null);

  const [messages] = useCollection(
    query(
      collection(db, "users", userEmail, "chats", id, "messages"),
      orderBy("createdAt", "asc")
    )
  );

  // Scroll to the bottom whenever messages update
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <div className="max-w-3xl mx-auto">
      {messages?.empty && (
        <div className="flex flex-col items-center gap-2 py-5">
          <p>Type a prompt in below to get started!</p>
          <BsArrowDownCircle className="text-xl text-green-300 animate-bounce" />
        </div>
      )}
      {messages?.docs?.map((message, index) => (
        <div key={message?.id}>
          <Message message={message?.data()} />
          {index < messages?.docs?.length - 1 && <div className="" />}
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default Chat;
