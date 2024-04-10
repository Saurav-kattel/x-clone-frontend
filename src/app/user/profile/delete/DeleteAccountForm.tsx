"use client";
import {
  FormField,
  FormItem,
  FormLabel,
  Form,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import { handleSubmit } from "./deleteAccount";
import { Input } from "@/components/ui/input";
import { ResponseType } from "../../login/LoginForm";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const DeleteAccountForm = ({ cookie }: { cookie: string }) => {
  const formSchema = z.object({
    password: z.string().min(6),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });
  const router = useRouter();
  const [response, setResponse] = useState<ResponseType>();

  useEffect(() => {
    router.refresh();
  }, [response]);

  return (
    <div className="h-[20vh]">
      <Form {...form}>
        <form
          className="flex flex-col justify-center items-center gap-1 p-4 border w-[30vw] shadow   shadow-red-400  border-red-800 rounded-lg"
          onSubmit={form.handleSubmit(async (data) => {
            setResponse(await handleSubmit(data, cookie));
            setTimeout(() => {
              setResponse(undefined);
            }, 2000);
          })}
        >
          <h2 className="p-2 m-2 font-semibold text-red-700 text-xl">
            DELETE ACCOUNT
          </h2>
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col justify-center items-start flex-wrap">
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input autoComplete="false" {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          {response && response.status != 200 ? (
            <div className="text-red-500 text-center">
              {response.res.message}
            </div>
          ) : null}

          <Button variant={"destructive"} className=" m-2 px-4 ">
            DELETE
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default DeleteAccountForm;
