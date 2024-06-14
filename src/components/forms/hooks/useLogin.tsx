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
import { stat } from "fs";
import { useEffect, useState } from "react";

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

const FormSchemaResetPassword = z.object({
    password: z.string().min(6, dialogLexicon.ERROR_MESSAGES.password),
    confirmPassword: z
      .string()
      .min(6, dialogLexicon.ERROR_MESSAGES.confirmPassword),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

const useLogin = (onTabChange?: (changeTab: string) => void) => {
  const { toast } = useToast();
  const router = useRouter();
  const [emailTEST, setEmail] = useState("");

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

  const formResetPassword = useForm({
    resolver: zodResolver(FormSchemaResetPassword),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const getEndpoint = (
    data:
      | z.infer<typeof FormSchemaLogin>
      | z.infer<typeof FormSchemaRegister>
      | z.infer<typeof FormSchemaForgotPassword>
      | z.infer<typeof FormSchemaPasswordCode>
      | z.infer<typeof FormSchemaResetPassword>
  ) => {
    if (FormSchemaRegister.safeParse(data).success) {
      return {
        endPoint: "/api/auth/register",
        operationType: "register",
        changeTab: "entrar",
      };
    } else if (FormSchemaLogin.safeParse(data).success) {
      return { endPoint: "/login", operationType: "login" };
    } else if (FormSchemaForgotPassword.safeParse(data).success) {
      return {
        endPoint: "/api/auth/forgot-password",
        operationType: "forgotPassword",
        changeTab: "formCodigo",
      };
    } else if (FormSchemaPasswordCode.safeParse(data).success) {
      return {
        endPoint: "/api/auth/verify-code",
        operationType: "passwordCode",
        changeTab: "formResetPassword",
      };
    } else if (FormSchemaResetPassword.safeParse(data).success) {
      return {
        endPoint: "/api/auth/reset-password",
        operationType: "resetPassword",
        changeTab: "entrar"
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
    mutationFn: async (
      data:
        | z.infer<typeof FormSchemaLogin>
        | z.infer<typeof FormSchemaRegister>
        | z.infer<typeof FormSchemaForgotPassword>
        | z.infer<typeof FormSchemaPasswordCode>
        | z.infer<typeof FormSchemaResetPassword>
    ) => {
      const { endPoint, operationType } = getEndpoint(data);
      // const url = `${process.env.NEXT_PUBLIC_API_URL}${endPoint}`;
      
      const url = endPoint;
      // let payloadData = data;
      // if (payloadData && operationType === "resetPassword") {
      //   payloadData = { ...data, email }; // Adiciona o email ao payload apenas na operação resetPassword
      // }
      if (operationType === "login") {
        return;
      } else if (operationType === "resetPassword") {
        const payloadData = { ...data, emailTEST};
        return await axios.post(url, payloadData);
      } else {
        return await axios.post(url, data);
      }
    },
  });
  console.log(emailTEST)
  const resetForm = (operationType: string) => {
    if (operationType === "login") {
      formLogin.reset();
    } else if (operationType === "register") {
      formRegister.reset();
    } else if (operationType === "forgotPassword") {
      formForgotPassword.reset();
    } else if (operationType === "passwordCode") {
      formPasswordCode.reset();
    } else if (operationType === "resetPassword") {
      formResetPassword.reset();
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

  useEffect(() => {
    if (emailTEST) {
      // Aqui você pode realizar qualquer ação necessária com o email salvo
      console.log('Email salvo:', emailTEST);
    }
  }, [emailTEST]); // Este efeito será disparado toda vez que 'email' mudar

  const onSubmit = (
    data:
      | z.infer<typeof FormSchemaRegister>
      | z.infer<typeof FormSchemaForgotPassword>
      | z.infer<typeof FormSchemaPasswordCode>
      | z.infer<typeof FormSchemaResetPassword>
  ) => {
    if (FormSchemaForgotPassword.safeParse(data).success) {
      setEmail((data as z.infer<typeof FormSchemaForgotPassword>).email);
      // Save the email when the forgot password form is submitted
    }
    mutation.mutate(data, {
      onSuccess: (dataResponse: any) => {
        const { operationType, changeTab } = getEndpoint(data);
        const statusCode = dataResponse?.data?.status || dataResponse.status;
        const responseMsg = dataResponse?.data?.message || dataResponse.data;
        console.log(dataResponse);
        if (FormSchemaForgotPassword.safeParse(data).success) {
          setEmail((data as z.infer<typeof FormSchemaForgotPassword>).email);
          // Save the email when the forgot password form is submitted
        }

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
        console.log(statusCode);
        if (statusCode === 201 || statusCode === 200) {
          toast({
            title: title,
          });
          if (operationType === "register" && onTabChange && changeTab) {
            onTabChange(changeTab);
          }
          if (operationType === "forgotPassword" && onTabChange && changeTab) {
            onTabChange(changeTab);    
          }
          if (operationType === "passwordCode" && onTabChange && changeTab) {
            onTabChange(changeTab);
          }
          if (operationType === "resetPassword" && onTabChange && changeTab) {
            onTabChange(changeTab);
          }
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
        // implementar msg de erro de redefinição de senha e código aqui
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
    FormSchemaForgotPassword,
    formResetPassword,
    mutation,
    emailTEST,
    onSubmitLogin,
    onSubmit,
  };
};

export default useLogin;
