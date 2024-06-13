"use client";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ReloadIcon } from "@radix-ui/react-icons";
import useLogin from "./hooks/useLogin";

interface ResetPasswordFormProps {
  onTabChange: (value: string) => void;
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ onTabChange }) => {
  const { formResetPassword, mutation, onSubmit } = useLogin((changeTab) =>
    onTabChange(changeTab)
  );

  return (
    <Card>
      <CardHeader>
        <CardDescription>
          Digite sua nova senha
          
        </CardDescription>
      </CardHeader>
      <CardHeader>
        <Form {...formResetPassword}>
          <form
            onSubmit={formResetPassword.handleSubmit(onSubmit)}
            className="space-y-6"
          >

            <FormField
              control={formResetPassword.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Senha</FormLabel>
                  <Input
                    type="password"
                    required
                    placeholder="senha"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formResetPassword.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmação de senha</FormLabel>
                  <Input
                    type="password"
                    required
                    placeholder="confirme a senha"
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
                <Button type="submit">Registrar</Button>
              )}
            </div>
          </form>
        </Form>
      </CardHeader>
    </Card>
  );
};

export default ResetPasswordForm;