"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { dialogLexicon } from "@/components/forms/lexicon/pt";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

const FormSchemaDialogEditAvatar = z.object({
  file: z.string().min(6, dialogLexicon.ERROR_MESSAGES.password),
});

const useDialogEditAvatar = () => {
  const formDialogEditAvatar = useForm({
    resolver: zodResolver(FormSchemaDialogEditAvatar),
    defaultValues: {
      file: "",
    },
  });

  const { toast } = useToast();
  const { reset } = formDialogEditAvatar;
  const router = useRouter();
  const { data: session } = useSession();
  const mutation = useMutation({ mutationFn: onSubmitDialogEditAvatar });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          formDialogEditAvatar.setValue("file", reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmitDialogEditAvatar(
    values: z.infer<typeof FormSchemaDialogEditAvatar>
  ) {
    try {
      const response = await axios.post("/api/auth/edit-photo-profile", values);

      const statusCode = response?.data?.status || response?.status;
      if (statusCode === 201 || statusCode === 200) {
        toast({
          title: dialogLexicon.SUCCESS_MESSAGES.avatarSendSuccess,
        });
      } else {
        const errorMessage = response?.data?.message;
        toast({
          variant: "destructive",
          title: errorMessage,
        });
      }
      reset();
    } catch (err: any) {
      let errorMessage =
        err.response?.data?.error ||
        "Ocorreu um erro ao enviar a imagem. Por favor, tente novamente.";
      toast({
        variant: "destructive",
        title: dialogLexicon.ERROR_MESSAGES.avatarSendError,
        description: errorMessage,
      });
    }
    reset();
  }

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    formDialogEditAvatar,
    isLoading: mutation.isPending,
    handleFileChange,
    onSubmitDialogEditAvatar,
  };
};

export default useDialogEditAvatar;
