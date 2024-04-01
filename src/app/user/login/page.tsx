import React from "react";
import { checkLoginCookie } from "@/lib/checkLoginCookies";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import LoginForm from "./LoginForm";

const page = () => {
  return (
    <div>
      <LoginForm />
    </div>
  );
};

export default page;
