"use client"
import useLogin from "@/components/forms/hooks/useLogin";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const { data: session } = useSession();

  if (!session) {
    return router.push("/login"); // Optional, can show a loading spinner here too
  }
  return <>{session && <div>oi</div>}</>;
}
