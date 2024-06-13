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

interface RegisterFormProps {
  onTabChange: (value: string) => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ onTabChange }) => {
  const { formRegister, mutation, onSubmit } = useLogin((changeTab) =>
    onTabChange(changeTab)
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Faça o cadastro</CardTitle>
        <CardDescription>
          Caso já possua conta criada,{" "}
          <span
            onClick={() => onTabChange("entrar")}
            style={{ color: "blue", cursor: "pointer" }}
          >
            fazer login
          </span>
        </CardDescription>
      </CardHeader>
      <CardHeader>
        <Form {...formRegister}>
          <form
            onSubmit={formRegister.handleSubmit(onSubmit)}
            className="space-y-6"
          >
            <FormField
              control={formRegister.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <Input type="text" required placeholder="nome" {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formRegister.control}
              name="lastname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <Input
                    type="text"
                    required
                    placeholder="sobrenome"
                    {...field}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={formRegister.control}
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

            <FormField
              control={formRegister.control}
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
              control={formRegister.control}
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

export default RegisterForm;
