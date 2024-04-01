"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { handleSubmit } from "./handleSubmit";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { redirect } from "next/navigation";

const LoginForm = () => {
  const formSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // using state to store api response
  const [response, setResponse] = useState<
    { status: number; res: { message: string } } | undefined
  >();

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setResponse(undefined);
    }, 2000);
    if (response && response.status == 200) {
      redirect("/");
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [response]);

  return (
    <div className="flex justify-center items-center w-[100vw] h-[100vh]">
      <Form {...form}>
        <div className="flex lg:flex-row  md:flex-col sm:flex-col justify-evenly items-center  gap-1 border-[2px] border-[#000020] rounded-md p-4 w-[70vw] h-[80vh]">
          <div className="lg:w-[35vw] md:hidden sm:hidden border-r-[1px] border-[#000030] text-white lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-1 hidden">
            <span className="text-2xl">welcome to</span>
            <span className="text-9xl font-bold">X</span>
            <span className="text-4xl">Clone</span>
          </div>

          <form
            className="flex lg:w-[35vw] outline-[1px] outline-green-200 flex-col justify-center items-center gap-1 text-white"
            onSubmit={form.handleSubmit(async (data) => {
              setResponse(await handleSubmit(data));
            })}
          >
            <span className="lg:hidden p-2 text-2xl">welcome to x clone</span>
            <h1 className="text-white text-3xl p-2 text-center">Join Today!</h1>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col justify-center items-start flex-wrap">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="example@gmail.com" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem className="flex flex-col p-2 justify-center items-start flex-wrap">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <Button className="p-4 m-2">Login</Button>
            <span>Or</span>
            <Link
              className="bg-blue-950 rounded-xl text-white  px-4 py-2 m-2 "
              href="/user/register"
            >
              Create Account
            </Link>
            <div>
              {response && response.status != 200 ? (
                <div className="text-red-500 capitalize  text-xl ">
                  Opps! {response.res.message}
                </div>
              ) : null}
            </div>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default LoginForm;