"use client";
import React from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

export default function Header() {
  const { data: session } = useSession();
  const { setTheme } = useTheme();

  return (
    <div className="flex gap-4 justify-end p-2 pr-10 mr-30 flex-wrap">
      {session && (
        <>
          <Link href="/">Home</Link>
          <Link href="/sobre">Sobre</Link>
          <Link href="/contato">Contato</Link>
        </>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">Toggle theme</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => setTheme("light")}>
            Modo claro
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setTheme("dark")}>
            Modo escuro
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
