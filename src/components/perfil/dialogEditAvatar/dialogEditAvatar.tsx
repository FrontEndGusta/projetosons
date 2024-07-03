import DialogResetPasswordForm from "@/components/forms/form-dialog-reset-password/DialogResetPassword";
import DialogEditAvatarForm from "@/components/forms/form-edit-avatar/DialogEditAvatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DialogEditAvatar() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <span
          className="text-[#7C3AED] dark:text-[#F9FAFB]"
          style={{ cursor: "pointer" }}
        >
          editar foto
        </span>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Atualize sua foto de perfil</DialogTitle>
        </DialogHeader>
        <DialogEditAvatarForm />
      </DialogContent>
    </Dialog>
  );
}

export default DialogEditAvatar;
