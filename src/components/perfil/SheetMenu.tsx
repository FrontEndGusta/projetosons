"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";
import useSheetMenu from "./hooks/useSheetMenu";
import EditProfileForm from "../forms/form-edit-profile/editProfile";
export function SheetSide() {
    const {name, email} = useSheetMenu()
  return (
    <div className="grid gap-2 cursor-pointer">
      <Sheet key={"left"}>
        <SheetTrigger asChild>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </SheetTrigger>
        <SheetContent side={"left"}>
          <SheetHeader className='flex-row gap-2'>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
            <SheetTitle>Editar Perfil</SheetTitle>
          </SheetHeader>
          <div className="grid gap-4 py-4">
            <EditProfileForm />
          </div>
          
        </SheetContent>
      </Sheet>
    </div>
  );
}
