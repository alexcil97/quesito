"use client";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { CardWrapper } from "../card-wrapper";
import * as z from "zod";
import { RegisterValidator } from "@/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useTransition } from "react";
import { Input } from "@nextui-org/input";
import { Button } from "@/components/ui/button";
import { register } from "@/actions/register";
import { useRouter } from "next/navigation";

export const RegisterForm = () => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter()

  const form = useForm<z.infer<typeof RegisterValidator>>({
    resolver: zodResolver(RegisterValidator),
    defaultValues: {
      email: "",
      nombre: "",
      apellido: "",
      edad: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterValidator>) => {
    const formValues = {
      ...values,
      edad: values.edad ? new Date(values.edad) : undefined, // Convertir cadena a Date
    };
    console.log("Depurador");

    startTransition(() => {
      console.log("ENVIANDO DATOS", values);

      register(values).then((data) => {
        if (data?.error) {
          form.reset();
          //informar al usuario de error
        }
        if (data?.success) {
          form.reset();
          console.log("REGISTRO HECHO")
          router.replace("/auth/login");
          router.refresh()
        }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Registrarse"
      backButtonLabel="¿Ya tienes una cuenta?"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      isRequired
                      variant="underlined"
                      label="Correo Electrónico"
                      {...field}
                      type="email"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nombre"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isPending}
                      isRequired
                      variant="underlined"
                      label="nombre"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="apellido"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isRequired
                      variant="underlined"
                      label="apellido"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="edad"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isRequired
                      variant="underlined"
                      label="edad"
                      {...field}
                      type="date"
                      className="border rounded px-2 py-1 w-full"
                      value={
                        field.value
                          ? new Date(field.value).toISOString().split("T")[0]
                          : ""
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      isRequired
                      variant="underlined"
                      label="Contraseña"
                      {...field}
                      type="password"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="w-full">
            Registrarse
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
