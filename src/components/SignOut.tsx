"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { PiSignOut } from "react-icons/pi";
import { cn } from "../lib/utils";
import { signOut } from "next-auth/react";

const SignOut = ({ className }: { className?: string }) => {
  const router = useRouter();
  const handleSignOut = () => {
    signOut();
    router.push("/signin");
    toast.success("Sign out successfully!");
  };
  return (
    <button
      onClick={handleSignOut}
      className={cn(
        "group flex w-full items-center gap-3 rounded-lg p-3 cursor-pointer data-[focus]:bg-white/10",
        className
      )}
    >
      <div className="w-7 h-7 bg-[#B4B4B440] rounded-full flex items-center justify-center">
        <PiSignOut className="text-base" />
      </div>

      <button type="submit">Sign Out</button>
    </button>
  );
};

export default SignOut;
