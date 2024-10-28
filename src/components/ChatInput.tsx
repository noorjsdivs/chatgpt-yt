"use client";
import { db } from "@/firebase";
import { Message } from "@/type";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { ImArrowUpRight2 } from "react-icons/im";
import { TbPaperclip } from "react-icons/tb";
import ModelSelection from "./ModelSelection";
import useSWR from "swr";

const ChatInput = ({ id }: { id?: string }) => {
  const chatId = id;
  const router = useRouter();
  const [prompt, setPrompt] = useState("");
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const { data: model } = useSWR("model", {
    fallbackData: "gpt-4-turbo",
  });

  // const model = "gpt-4-turbo";

  const userEmail = session?.user
    ? (session?.user?.email as string)
    : "unknown";
  const userName = session?.user ? (session?.user?.email as string) : "unknown";

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();
    const message: Message = {
      text: input,
      createdAt: serverTimestamp(),
      user: {
        _id: userEmail,
        name: userName,
        avatar:
          (session?.user?.image as string) ||
          "https://i.ibb.co.com/XC0YX8v/avatar.png",
      },
    };

    try {
      setLoading(true);
      let chatDocumentId = chatId;

      // If no chat ID is provided, create a new chat and get the ID
      if (!chatId) {
        const docRef = await addDoc(
          collection(db, "users", userEmail, "chats"),
          {
            userId: userEmail,
            createdAt: serverTimestamp(),
          }
        );
        chatDocumentId = docRef.id;
        router.push(`/chat/${chatDocumentId}`);
      }

      // Add the message to the new or existing chat
      await addDoc(
        collection(
          db,
          "users",
          userEmail,
          "chats",
          chatDocumentId as string,
          "messages"
        ),
        message
      );
      setPrompt("");

      // Toast notification to say loading
      const notification = toast.loading("ChatGPT is thinking...");

      // Send request to backend API
      await fetch("/api/askchat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: input,
          id: chatDocumentId,
          model,
          session: userEmail,
        }),
      }).then(async (res) => {
        const data = await res.json();

        if (data?.success) {
          toast.success(data?.message, {
            id: notification,
          });
        } else {
          toast.error(data?.message, {
            id: notification,
          });
        }
      });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center max-w-3xl mx-auto pt-3">
      <form
        onSubmit={sendMessage}
        className="bg-white/10 rounded-full flex items-center px-4 py-2.5 w-full"
      >
        <TbPaperclip className="text-2xl -rotate-45 text-primary-foreground" />
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Message ChatGPT"
          className="bg-transparent text-primary-foreground font-medium placeholder:text-primary-foreground/50 px-3 outline-none w-full"
          disabled={loading}
        />
        <button
          disabled={!prompt || loading}
          type="submit"
          className={`p-2.5 rounded-full text-black flex items-center justify-center transition-transform duration-200 bg-white disabled:bg-white/30`}
        >
          <ImArrowUpRight2 className="-rotate-45 text-sm text-primary/80" />
        </button>
      </form>

      {id && (
        <p className="text-xs mt-2 font-medium tracking-wide">
          ChatGPT can make mistakes. Check important info.
        </p>
      )}
      <div className="w-full md:hidden mt-2">
        <ModelSelection />
      </div>
    </div>
  );
};

export default ChatInput;
