"use client";
import React, { useState } from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useLogin from "./hooks/useLogin";
import { ReloadIcon } from "@radix-ui/react-icons";
import RegisterForm from "./Register";
import ForgotPasswordForm from "./ForgotPassword";
import FormCodigo from "./FormCodigo";

const Login = () => {
  const { formLogin, formForgotPassword, mutation, onSubmitLogin } = useLogin(); // Use o hook useLogin aqui
  const [activeTab, setActiveTab] = useState("entrar");

  const onTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs value={activeTab} onValueChange={onTabChange} className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="entrar">Entrar</TabsTrigger>
        <TabsTrigger value="registrar">Registrar</TabsTrigger>
      </TabsList>

      <TabsContent value="entrar">
        <Card>
          <CardHeader>
            <CardTitle>Faça o Login</CardTitle>
            <CardDescription>
              Caso não tenha conta criada,{" "}
              <span
                onClick={() => onTabChange("registrar")}
                style={{ color: "blue", cursor: "pointer" }}
              >
                registre-se
              </span>
            </CardDescription>
          </CardHeader>
          <CardHeader>
            <Form {...formLogin}>
              <form
                onSubmit={formLogin.handleSubmit(onSubmitLogin)}
                className="space-y-6"
              >
                <FormField
                  control={formLogin.control}
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
                  control={formLogin.control}
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
                <CardDescription>
                  Esqueceu sua senha?{" "}
                  <span
                    onClick={() => onTabChange("recuperarSenha")}
                    style={{ color: "blue", cursor: "pointer" }}
                  >
                    Recuperar senha
                  </span>
                </CardDescription>
                <div className="flex justify-end">
                  {mutation.isPending ? (
                    <Button disabled>
                      <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                      Entrando...
                    </Button>
                  ) : (
                    <Button type="submit">Entrar</Button>
                  )}
                </div>
              </form>
            </Form>
          </CardHeader>
        </Card>
      </TabsContent>

      <TabsContent value="registrar">
        <RegisterForm onTabChange={onTabChange} />
      </TabsContent>
      <TabsContent value="recuperarSenha">
        <ForgotPasswordForm onTabChange={onTabChange} />
      </TabsContent>
      <TabsContent value="formCodigo">
        <FormCodigo onTabChange={onTabChange} />
      </TabsContent>
    </Tabs>
  );
};

export default Login;
