"use client"
import ServiceDeskForm from "@/components/forms/form-service-desk/ServiceDesk";
import LayoutAdmin from "@/components/LayoutAdmin";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Page() {

  return (
    <LayoutAdmin>
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Edit Profile</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Make changes</DialogDescription>
          </DialogHeader>
         <ServiceDeskForm />

        </DialogContent>
      </Dialog>
    </div>
    </LayoutAdmin>
  );
}
