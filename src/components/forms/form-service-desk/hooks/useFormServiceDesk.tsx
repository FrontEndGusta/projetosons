"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { dialogLexicon } from "@/components/forms/lexicon/pt";
import { useRouter } from "next/navigation";


const FormSchemaServiceDesk = z
  .object({
    name: z.string().min(6, dialogLexicon.ERROR_MESSAGES.firstName),
    telephone: z
      .string()
      .min(6, dialogLexicon.ERROR_MESSAGES.telephoneError),
  })

const useServiceDesk = () => {
  const formServiceDesk = useForm({
    resolver: zodResolver(FormSchemaServiceDesk),
    defaultValues: {
      name: "",
      telephone: ''
    },
  });

  const { toast } = useToast();
  const router = useRouter();

  const mutation = useMutation({ mutationFn: onSubmitServiceDesk });

  async function onSubmitServiceDesk(
    values: z.infer<typeof FormSchemaServiceDesk>
  ) {
    try {
      const response = await axios.post("/api/auth/service-desk-tickets", {...values});
      const statusCode = response?.data?.status || response?.status;
      console.log(response)
      if (statusCode === 201 || statusCode === 200) {
        toast({
          title: dialogLexicon.SUCCESS_MESSAGES.serviceDeskSuccess,
        });

      } else {
        const errorMessage = response?.data?.message;
        toast({
          variant: "destructive",
          title: errorMessage,
        });
      }
    } catch (err: any) {
      let errorMessage =
        err.response?.data?.error ||
        "Ocorreu um erro ao criar o chamado. Por favor, tente novamente.";
      toast({
        variant: "destructive",
        title: dialogLexicon.ERROR_MESSAGES.serviceDesksendError,
        description: errorMessage,
      });
    }
  }

  return {
    isPending: mutation.isPending,
    error: mutation.error,
    data: mutation.data,
    formServiceDesk,
    isLoading: mutation.isPending,
    onSubmitServiceDesk,
  };
};

export default useServiceDesk;
