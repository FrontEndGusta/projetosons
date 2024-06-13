"use client";
import React from "react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { TabsContent } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { ReloadIcon } from "@radix-ui/react-icons";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import useLogin from "./hooks/useLogin";

interface ForgotPasswordFormProps {
  onTabChange: (value: string) => void;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({
  onTabChange,
}) => {
  const { formForgotPassword, formPasswordCode, mutation, onSubmit } = useLogin(
    (changeTab) => onTabChange(changeTab)
  );

  return (
    <>
      <TabsContent value="recuperarSenha">
        <Card>
          <CardHeader>
            <CardTitle>Recuperar senha</CardTitle>
            <CardDescription>
              Insira seu e-mail para receber o código de confirmação.
            </CardDescription>
          </CardHeader>
          <CardHeader>
            <Form {...formForgotPassword}>
              <form
                onSubmit={formForgotPassword.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={formForgotPassword.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>E-mail</FormLabel>
                      <Input
                        type="email"
                        required
                        placeholder="example@example.com"
                        {...field}
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end">
                  {mutation.isPending ? (
                    <Button disabled>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </Button>
                  ) : (
                    <Button type="submit">Enviar</Button>
                  )}
                </div>
                <CardDescription>
                  Voltar para{" "}
                  <span
                    onClick={() => onTabChange("entrar")}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Login
                  </span>
                </CardDescription>
              </form>
            </Form>
          </CardHeader>
        </Card>
      </TabsContent>

      <TabsContent value="formCodigo">
        <Card>
          <CardHeader>
            <Form {...formPasswordCode}>
              <form
                onSubmit={formPasswordCode.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={formPasswordCode.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Insira o código</FormLabel>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormDescription>
                        Digite o código recebido por e-mail
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex justify-end">
                  {mutation.isPending ? (
                    <Button disabled>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Enviando...
                    </Button>
                  ) : (
                    <Button type="submit">Enviar</Button>
                  )}
                </div>
                <CardDescription>
                  <span
                    onClick={() => onTabChange("recuperarSenha")}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Voltar
                  </span>
                </CardDescription>
              </form>
            </Form>
          </CardHeader>
        </Card>
      </TabsContent>
    </>
  );
};

export default ForgotPasswordForm;
