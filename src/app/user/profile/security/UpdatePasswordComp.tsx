"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ResponseType } from "../../login/LoginForm";
import { handleSubmit } from "./updatePassword";

const UpdatePasswordComp = ({ cookie }: { cookie: string }) => {
  const formSchema = z.object({
    oldPassword: z.string().min(6),
    newPassword: z.string().min(6),
    confirmPassword: z.string().min(6),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const [response, setResponse] = useState<ResponseType>();
  return (
    <div>
      <Form {...form}>
        <form
          className="flex flex-col justify-center items-center gap-1 p-4 border w-[30vw] shadow   shadow-slate-400  border-slate-800 rounded-lg"
          onSubmit={form.handleSubmit(async (data) => {
            let res = await handleSubmit(data);
            setResponse(res);

            setTimeout(() => {
              if (res && res.status == 200) {
                form.reset();
              }
              setResponse(undefined);
            }, 2000);
          })}
        >
          <h2 className="p-2 m-2 font-semibold text-white text-xl">
            Update Password
          </h2>

          <FormField
            control={form.control}
            name="oldPassword"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col justify-center items-start flex-wrap">
                  <FormLabel>Old Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name="newPassword"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col justify-center items-start flex-wrap">
                  <FormLabel>New Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => {
              return (
                <FormItem className="flex flex-col justify-center items-start flex-wrap">
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input {...field} type="password" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
          <Button className="p-2 px-4 m-2">Save</Button>
          {response && response.status == 200 ? (
            <div className="text-green-500 text-center">Updated Password</div>
          ) : null}
          {response && response.status != 200 ? (
            <div className="text-red-500 text-center">
              {response.res.message}
            </div>
          ) : null}
        </form>
      </Form>
    </div>
  );
};

export default UpdatePasswordComp;
