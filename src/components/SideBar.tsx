"use client";
import { useSession } from "next-auth/react";
import NewChat from "./NewChat";
import { useCollection } from "react-firebase-hooks/firestore";
import { collection, orderBy, query } from "firebase/firestore";
import { db } from "@/firebase";
import ChatRow from "./ChatRow";
import { IoHome } from "react-icons/io5";
import Link from "next/link";
import ModelSelection from "./ModelSelection";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const SideBar = () => {
  const { data: session } = useSession();
  const [chats, loading] = useCollection(
    session &&
      query(
        collection(db, "users", session?.user?.email as string, "chats"),
        orderBy("createdAt", "asc")
      )
  );
  const router = useRouter();

  useEffect(() => {
    if (!chats) {
      router.push("/");
    }
  }, [chats, router]);

  return (
    <div className="hidden md:inline-flex flex-col w-full h-screen p-2.5 relative">
      {/* New Chat */}
      <div className="flex items-center gap-1">
        <Link
          href={"/"}
          className="border border-white/10 text-xs md:text-base p-1.5 md:p-2 rounded-md text-white/50 hover:text-white hover:border-white/50 duration-300 ease-in-out"
        >
          <IoHome />
        </Link>
        <NewChat />
      </div>

      <div className="hidden md:inline mt-4 w-full">
        <ModelSelection />
      </div>
      {session?.user ? (
        <>
          <p className="text-white mt-4 px-2 text-sm font-medium">
            Chat History
          </p>
          <div className="mt-4 overflow-y-scroll h-[80%]">
            {loading ? (
              <div className="flex flex-col flex-1 space-y-2 overflow-auto">
                {Array.from({ length: 10 }).map((_, i) => (
                  <div
                    key={i}
                    className="w-full h-8 rounded-md shrink-0 animate-pulse bg-zinc-800"
                  />
                ))}
              </div>
            ) : chats?.docs.length ? (
              chats?.docs?.map((chat, index) => (
                <ChatRow key={chat?.id} id={chat?.id} index={index} />
              ))
            ) : (
              <div className="py-8 text-center">
                <p className="text-sm text-muted-foreground">No chat history</p>
              </div>
            )}
          </div>
        </>
      ) : (
        !loading && (
          <div className="text-sm font-medium text-center mt-10">
            <p>Please sign in to view history</p>
            <Link
              href={"/signin"}
              className="text-xs hover:text-white duration-300 mt-2 underline decoration-[1px]"
            >
              Sign in
            </Link>
          </div>
        )
      )}
    </div>
  );
};

export default SideBar;
