"use client"

import { RootState } from "@/app/redux/app/store";
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { handleProfileUpdate } from "./handleProfileUpdate";


const ChangeProfileImage = ({ cookie, username, setResponse }: { cookie: string; username: string; setResponse: React.Dispatch<React.SetStateAction<any>>; }) => {

  const ref = useRef<HTMLInputElement>(null);

  const { res } = useSelector(
    (state: RootState) => state.profileImg
  );

  const [formFile, setFormFile] = useState<FormData>();
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setFormFile(formData);

      const reader = new FileReader();
      reader.onloadend = () => {
        setImgSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };



  const [imgSrc, setImgSrc] = useState<any>(
    `data:image/jpeg;base64,${res?.res.image}`
  );
  return <div className="flex justify-center items-center gap-2">
    <label className="flex justify-center gap-2  rounded-lg my-2 p-2 font-bold items-center">
      {res?.res.image ? (
        <img
          src={imgSrc}
          alt="Selected Image"
          className="w-[100px] h-[100px] rounded-[100px] my-2 hover:cursor-pointer"
          onClick={() => ref.current?.click()}
        />
      ) : (
        <div className="rounded-[50%] flex justify-center items-center text-center w-[100px] bg-gray-200 h-[100px]">
          <span className="text-4xl text-slate-600 font-bold ">
            {username.slice(0, 1).toUpperCase()}
          </span>
        </div>
      )}

      <span>change profile image</span>

      <input
        ref={ref}
        type="file"
        id="ft"
        className="hidden"
        onChange={handleFileChange}
      />
    </label>
    <button
      className="border-[1px] border-transparent hover:border-slate-600 p-2 rounded-md transition-all"
      onClick={() => {
        handleProfileUpdate({
          setResponse,
          cookies: cookie,
          formFile,
        })
      }}>save</button>
  </div>
}


export default ChangeProfileImage;
