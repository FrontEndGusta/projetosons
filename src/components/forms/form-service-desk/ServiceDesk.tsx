"use client";
import React from "react";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
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
import useServiceDesk from "./hooks/useFormServiceDesk";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ServiceDeskForm: React.FC = () => {
  const { formServiceDesk, isLoading, onSubmitServiceDesk } = useServiceDesk();

  return (
    <>
      <Form {...formServiceDesk}>
        <form
          onSubmit={formServiceDesk.handleSubmit(onSubmitServiceDesk)}
          className="space-y-6"
        >
          <FormField
            control={formServiceDesk.control}
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
            control={formServiceDesk.control}
            name="telephone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <Input
                  type="text"
                  required
                  placeholder="digite seu telefone"
                  {...field}
                />
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={formServiceDesk.control}
            name="locale"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Localidade</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="m@example.com">m@example.com</SelectItem>
                    <SelectItem value="m@google.com">m@google.com</SelectItem>
                    <SelectItem value="m@support.com">m@support.com</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            {isLoading ? (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Criando...
              </Button>
            ) : (
              <Button type="submit">Criar</Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};

export default ServiceDeskForm;
