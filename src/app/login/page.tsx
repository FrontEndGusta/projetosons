"use client";
import Login from "@/components/forms/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function PageLogin() {
  const router = useRouter();
  const { data: session } = useSession();

  if (session) {
    return router.push("/"); // Optional, can show a loading spinner here too
  }
  return (
    <>
      {!session && (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-gradient-to-br from-gray-800 via-gray-900 to-black w-full h-full">
          <div className=" p-4 flex justify-center">
            <div className="z-10 w-full lg:w-4/5 flex justify-center text-sm lg:flex">
              <Login />
            </div>
          </div>
        </main>
      )}
    </>
  );
}
