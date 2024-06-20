"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

import { ExitIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

export default function Header() {
  const { data: session } = useSession();
  const { setTheme } = useTheme();

  const userName: string = session?.user?.name
    ? session.user.name.split(" ")[0]
    : "Guest";

  return (
    <div className="flex gap-4 p-2 pr-10 flex-wrap justify-end">
      {session && (
        <>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="flex-grow px-2 flex items-center">{`Olá, ${userName}`}</span>
        </>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="icon">
            <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
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
      {session && (
        <Button variant="outline" size="icon" onClick={() => signOut()}>
          <ExitIcon />
        </Button>
      )}
    </div>
  );
}
