"use client"
import { useEffect } from "react";
import Login from "@/components/forms/Login";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import useLogin from "@/components/forms/hooks/useLogin";

export default function PageLogin() {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      router.push("/");
    }
  }, [session, router]);

  return (
    <>
      {!session && (
        <main className="flex min-h-screen flex-col items-center justify-between p-24 bg-bgCustom">
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
