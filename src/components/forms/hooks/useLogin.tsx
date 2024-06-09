"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useToast } from "@/components/ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { dialogLexicon } from "../lexicon/pt";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const FormSchemaLogin = z.object({
  email: z.string().email(dialogLexicon.ERROR_MESSAGES.email),
  password: z.string().min(6, dialogLexicon.ERROR_MESSAGES.password),
});

const FormSchemaRegister = z
  .object({
    name: z.string().min(2, dialogLexicon.ERROR_MESSAGES.firstName),
    lastname: z.string().min(2, dialogLexicon.ERROR_MESSAGES.lastName),
    email: z.string().email(dialogLexicon.ERROR_MESSAGES.email),
    password: z.string().min(6, dialogLexicon.ERROR_MESSAGES.password),
    confirmPassword: z
      .string()
      .min(6, dialogLexicon.ERROR_MESSAGES.confirmPassword),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const FormSchemaForgotPassword = z.object({
  email: z.string().email(dialogLexicon.ERROR_MESSAGES.email),
});

const FormSchemaPasswordCode = z.object({
  code: z.string().min(6, dialogLexicon.ERROR_MESSAGES.codeError),
});

const useLogin = () => {
  const { toast } = useToast();
  const router = useRouter();
  
  const formLogin = useForm({
    resolver: zodResolver(FormSchemaLogin),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formRegister = useForm({
    resolver: zodResolver(FormSchemaRegister),
    defaultValues: {
      name: "",
      lastname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const formForgotPassword = useForm({
    resolver: zodResolver(FormSchemaForgotPassword),
    defaultValues: {
      email: "",
    },
  });

  const formPasswordCode = useForm({
    resolver: zodResolver(FormSchemaPasswordCode),
    defaultValues: {
      code: "",
    },
  });

  const getEndpoint = (
    data:
      | z.infer<typeof FormSchemaLogin>
      | z.infer<typeof FormSchemaRegister>
      | z.infer<typeof FormSchemaForgotPassword>
      | z.infer<typeof FormSchemaPasswordCode>
  ) => {
    if (FormSchemaRegister.safeParse(data).success) {
      return { endPoint: "/auth/register", operationType: "register" };
    } else if (FormSchemaLogin.safeParse(data).success) {
      return { endPoint: "", operationType: "login" };
    } else if (FormSchemaForgotPassword.safeParse(data).success) {
      return {
        endPoint: "/auth/forgot-password",
        operationType: "forgotPassword",
      };
    } else if (FormSchemaPasswordCode.safeParse(data).success) {
      return {
        endPoint: "/auth/password-code",
        operationType: "passwordCode",
      };
    } else {
      toast({
        title: "Schema inválido",
        description: (
          <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
            <code className="text-white">{JSON.stringify(data, null, 2)}</code>
          </pre>
        ),
      });
      throw new Error("Invalid schema");
    }
  };

  const mutation = useMutation({
    mutationFn: (
      data:
        | z.infer<typeof FormSchemaLogin>
        | z.infer<typeof FormSchemaRegister>
        | z.infer<typeof FormSchemaForgotPassword>
        | z.infer<typeof FormSchemaPasswordCode>
    ) => {
      const { endPoint } = getEndpoint(data);
      const url = `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`;
      return axios.post("/api/auth/register", data);
    },
  });

  const resetForm = (operationType: string) => {
    if (operationType === "login") {
      formLogin.reset();
    } else if (operationType === "register") {
      formRegister.reset();
    } else if (operationType === "forgotPassword") {
      formForgotPassword.reset();
    }
  };
  
  async function onSubmitLogin(values: z.infer<typeof FormSchemaLogin>) {
    try {
      mutation.mutate(values);
      const response = await signIn("Credentials", {
        ...values,
        redirect: false,
      });
      toast({
        title: dialogLexicon.SUCCESS_MESSAGES.loginSuccess,
      });
      if (response && !response.error) {
        router.push("dashboard");
      } else {
        toast({
          variant: "destructive",
          title: dialogLexicon.ERROR_MESSAGES.loginError,
          description: response?.error || "Ocorreu um erro inesperado.",
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Ocorreu um erro inesperado.";
      toast({
        variant: "destructive",
        title: dialogLexicon.ERROR_MESSAGES.loginError,
        description: errorMessage,
      });
    }
  }

  const onSubmit = (
    data:
      | z.infer<typeof FormSchemaRegister>
      | z.infer<typeof FormSchemaForgotPassword>
      | z.infer<typeof FormSchemaPasswordCode>
  ) => {
    mutation.mutate(data, {
      onSuccess: (dataResponse: any) => {
        const { operationType } = getEndpoint(data);
        const statusCode = dataResponse?.data?.status;
        const responseMsg = dataResponse?.data?.message;

        const title =
          operationType === "login"
            ? dialogLexicon.SUCCESS_MESSAGES.loginSuccess
            : operationType === "register"
            ? dialogLexicon.SUCCESS_MESSAGES.registerSuccess
            : operationType === "forgotPassword"
            ? dialogLexicon.SUCCESS_MESSAGES.codeSuccess
            : operationType === "passwordCode"
            ? dialogLexicon.SUCCESS_MESSAGES.codeVerifiedSuccess
            : "";

        if (statusCode === 201) {
          toast({
            title: title,
          });
        } else {
          toast({
            title: responseMsg,
            variant: "destructive",
          });
        }

        resetForm(operationType);
      },
      onError: (error) => {
        const { operationType } = getEndpoint(data);
        const title =
          operationType === "login"
            ? dialogLexicon.ERROR_MESSAGES.loginError
            : operationType === "register"
            ? dialogLexicon.ERROR_MESSAGES.registerError
            : operationType === "forgotPassword"
            ? dialogLexicon.ERROR_MESSAGES.codeError
            : "";

        toast({
          variant: "destructive",
          title: title,
          description: error.message || "Ocorreu um erro inesperado.",
        });
        resetForm(operationType);
      },
    });
  };

  return {
    formRegister,
    formLogin,
    formPasswordCode,
    formForgotPassword,
    mutation,
    onSubmitLogin,
    onSubmit,
  };
};

export default useLogin;
