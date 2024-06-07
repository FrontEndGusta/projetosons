"use client"
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Switch } from "../ui/switch";
import { useTheme } from "next-themes";


export default function Header() {
 
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme()
  return (
    <div className={`flex gap-4 justify-end p-2 pr-10 mr-30 flex-wrap ${theme === 'dark' ? 'bg-bgHeader-dark' : 'bg-bgHeader-light'}`}>
      {session && (
        <>
          <Link href="/">Home</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </>
      )}
      <Switch onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} />
      <span></span>
      {/* 
        <span className="bg-zinc-300 rounded-sm px-2">{`Olá ${session?.user?.name.split(" ")[0]}`}</span> 
        <Button
          text="Sair"
          className="bg-red-600 text-white rounded px-2 cursor-pointer"
          onClick={() => signOut()}
        />
      */}
    </div>
  );
}
