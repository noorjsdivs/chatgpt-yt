import ChatInput from "@/src/components/ChatInput";
import ChatHelp from "@/src/components/ChatHelp";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-2">
      <div className="max-w-4xl mx-auto flex flex-col items-center gap-5">
        <h2 className="text-3xl font-semibold text-primary-foreground">
          What can I help with?
        </h2>
        <ChatInput />
        <ChatHelp />
      </div>
    </main>
  );
}
