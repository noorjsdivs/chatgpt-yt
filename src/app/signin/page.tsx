import { auth } from "@/auth";
import SignIn from "@/src/components/SignIn";
import { redirect } from "next/navigation";
import React from "react";

const SignInPage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/");
  }
  return (
    <div className="fixed w-full h-full bg-black/80 left-0 flex items-center justify-center">
      <SignIn />;
    </div>
  );
};

export default SignInPage;
