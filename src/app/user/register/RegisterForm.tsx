"use client";
import React, { useEffect, useState } from "react";
import { handleSubmit } from "./handleSubmit";
import { useRouter } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserAlt } from "@fortawesome/free-solid-svg-icons";
import Spinner from "@/lib/Spinner";




function FormItem({ type, name, value, setValue, placeholder }: { placeholder?: string; type: string; name: string, value: string, setValue: React.Dispatch<React.SetStateAction<typeof value>> }) {
  return <>
    <label htmlFor="Username" className="flex p-2 flex-col items-start justify-center">
      <span className="font-bold text-slate-400">{name}</span>
      <input autoComplete="off"
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={(e) => setValue(e.target.value)}
        className="px-2 py-1 bg-transparent border-b-[1px] border-b-slate-600 outline-none" />
    </label>
  </>


}

type FormInputArgs = { placeholder?: string; type: string; name: string, value: string, setValue: React.Dispatch<React.SetStateAction<string>> }

const RegisterForm = () => {
  const router = useRouter();

  const [response, setResponse] = useState<
    { status: number; res: { message: string } } | undefined
  >();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [pending, setPending] = useState(false)

  const items: FormInputArgs[] = [{
    type: "text",
    name: "First Name",
    placeholder: "Enter your first name",
    value: firstName,
    setValue: setFirstName
  }, {
    type: "text",
    name: "Username",
    placeholder: "Enter your username",
    value: username,
    setValue: setUsername
  },
  {
    type: "password",
    name: "Password",
    placeholder: "",
    value: password,
    setValue: setPassword
  }, {
    type: "text",
    name: "Last Name",
    placeholder: "Enter your Last Name",
    value: lastName,
    setValue: setLastName
  }, {
    type: "email",
    name: "Email",
    placeholder: "Enter your email",
    value: email,
    setValue: setEmail
  }, {
    type: "password",
    name: "Confirm Password",
    placeholder: "",
    value: confirmPassword,
    setValue: setConfirmPassword
  }]


  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setResponse(undefined);
    }, 2000);

    if (response && response.status == 200) {
      router.refresh();
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [response]);

  return (
    <div className="flex flex-col justify-evenly items-center w-[100vw] h-[100vh]">

      <form
        method="POST"
        autoComplete="off" className="flex w-[80dvw] flex-col border-[1px] border-slate-800 rounded-md p-8 justify-center items-center gap-2">

        <div className="p-4 flex flex-col justify-center items-center gap-2">
          <FontAwesomeIcon icon={faUserAlt} className="text-6xl" />
          <h3 className="font-bold hover:text-slate-400 text-4xl text-slate-600">Register</h3>
        </div>

        <div className="flex justify-evenly w-[75vw] items-center gap-2">

          <div className="flex flex-col gap-1 items-center justify-center">
            {items.slice(0, Math.floor(items.length / 2)).map((item) => <FormItem type={item.type} value={item.value} placeholder={item.placeholder} setValue={item.setValue} name={item.name} />)}
          </div>

          <div className="flex flex-col gap-1 items-center justify-center">
            {items.slice(Math.floor(items.length / 2)).map((item) => <FormItem type={item.type} value={item.value} placeholder={item.placeholder} setValue={item.setValue} name={item.name} />)}
          </div>


        </div>
        <button
          type="submit"
          onClick={() => {
            setPending(true)
            handleSubmit({ email, password, confirmPassword, firstName, lastName, username }).then((res) => {
              setResponse(res)
              setPending(false)
            }).then((err) => {
              setPending(false)
              console.error(err)
            })
          }}
          disabled={pending}
          className="px-4 py-2 text-center border-[1px] border-transparent text-slate-300 font-bold  rounded-md hover:border-slate-600">
          {pending ? <Spinner /> : "register"}
        </button>
        <div className="h-[2dvh]">
          {response && response.status != 200 ? <div className="text-red-400">
            {response.res.message}
          </div> : null}
        </div>
      </form>


    </div >
  );
};

export default RegisterForm;
