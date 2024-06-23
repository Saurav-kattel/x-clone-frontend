"use client";

import { redirect, useRouter } from "next/navigation";
import Spinner from "../../../lib/Spinner"
import React, { useState, useEffect } from "react";
import { handleSubmit } from "./handleSubmit";
import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

export type ResponseType =
  | { status: number; res: { message: string } }
  | undefined;




function Error({ res, pending }: { res: any, pending: boolean; }) {
  return <div className="h-[10vh] text-red-200">
    {res && !pending && res.status != 200 ? <div>
      <h3 className="font-semibold text-red-400 text-xl">Sigh, Error Occured!</h3>
      <p className="text-center text-red-600 text-sm px-2">{res.res.message}</p>
    </div> : null}
  </div>
}



const LoginForm = () => {

  const router = useRouter();
  const [response, setResponse] = useState<ResponseType>();
  const [pending, setPending] = useState<boolean>(false);
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showHiddenText, setShowHiddenText] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setResponse(undefined);
    }, 2000);

    const redirectTimeoutId = setTimeout(() => {
      if (response && response.status == 200) {
        router.refresh()
        redirect("/")
      }
      setPending(false)
    }, 500);


    return () => {
      clearTimeout(timeoutId);
      clearTimeout(redirectTimeoutId);
    };
  }, [response]);


  return (
    <div className="flex justify-evenly items-center w-[100vw] h-[100vh]">
      <div
        className="w-[48vw] hover:bg-[#00000e] transition-all ease-linear h-[70dvh] flex justify-center items-center gap-2 rounded-md">
        <div className="flex flex-col items-center justify-center cursor-pointer">
          <h2 className="text-6xl font-bold transition-all hover:text-slate-400 p-2 text-slate-600">HI</h2>
          <p className="text-2xl  hover:text-slate-500 text-slate-600 font-semibold ">Welcome</p>
          <p className="text-xl  hover:text-slate-600 font-semibold text-slate-500">to</p>
          <p className="text-8xl  hover:text-slate-800 font-bold text-slate-600">X</p>
          <p className="text-xl  hover:text-slate-400 font-semibold text-slate-500">clone</p>
          <Link className="text-md text-slate-500 cursor-pointer hover:underline hover:text-blue-100 underline-offset-1" href={"/user/register"}>New here? <strong>Register</strong></Link>
        </div>
      </div>


      <div
        onMouseLeave={() => setShowHiddenText(false)}
        onMouseEnter={() => setShowHiddenText(true)}
        className={`w-[50vw] h-[70dvh] flex justify-center flex-col  transition-all ease-linear items-center p-2 rounded-md hover:bg-[#00000e] hover:backdrop-blur-xl`}>
        <h2 className={`p-4 ${showHiddenText ? "text-slate-500" : "text-transparent"} font-bold text-slate-500 text-2xl`}>Welcome Back</h2>

        <form method="POST" className={`flex flex-col items-center justify-center  gap-2 p-4 border border-transparent hover:border-slate-900 rounded-lg`} >

          <h2 className="uppercase font-semibold text-slate-400 text-xl">Login</h2>

          <label htmlFor="Email" className="flex flex-col gap-1 font-semibold text-md text-slate-400 tracking-wide items-start justify-center">
            <span className="text-start">Email</span>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="text" name="email" className="border-b-[1px] border-slate-500 outline-none p-1 bg-transparent" />
          </label>

          <label htmlFor="Password" className="flex flex-col gap-1 font-semibold text-md text-slate-400 tracking-wide items-start justify-center">
            <span className="text-start">Password</span>
            <div className="flex justify-end items-end gap-2   outline-none p-1 bg-transparent">

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className=" border-b-[1px]  border-slate-500 outline-none p-1 bg-transparent" />
              <div onClick={() => setShowPassword(!showPassword)} className="w-[2vw] absolute "> {showPassword ? <FontAwesomeIcon icon={faEyeSlash} /> : <FontAwesomeIcon icon={faEye} />} </div>
            </div>
          </label>

          <button
            onClick={async () => {
              setPending(true)
              let res = await handleSubmit({ email, password })
              setResponse(res)
            }}
            disabled={pending}
            className="py-1 px-2 text-center flex items-center justify-center w-[8vw] outline-none bg-slate-900 rounded-lg ">
            {pending ? <Spinner /> :
              "Login"}
          </button>
        </form>
        <Error pending={pending} res={response} />
      </div>

    </div>
  );
};

export default LoginForm;
