"use client";
import { useRef, useState } from "react";
import { UserData } from "./BasicDetails";
import { handleProfileEdit } from "./handleProfileChange";

const EditModal = ({
  data,
  imageData,
  setVisibility,
  cookies,
}: {
  data: UserData;
  imageData: any;
  cookies: string;
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [username, setUsername] = useState<string>(data.username);
  const [formFile, setFormFile] = useState<FormData>();
  const [res, setRes] = useState<any>();
  const [imgSrc, setImgSrc] = useState<any>(
    `data:image/jpeg;base64,${imageData.res.image}`
  );

  async function handleProfileUpdate() {
    let response = await handleProfileEdit({
      username,
      imageData: formFile,
      cookies: cookies,
    });
    setRes(response);
    setTimeout(() => {
      setRes(undefined);
    }, 1000);
  }
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

  const ref = useRef<HTMLInputElement>(null);

  return (
    <div className="absolute w-[50vw] flex-col h-[80vh] flex justify-center items-center border border-slate-700 rounded-lg p-4 bg-[#000009]">
      <div className="font-semibold text-xl absolute top-2 flex items-center w-[50vw] justify-between">
        <span
          className="text-3xl hover:cursor-pointer hover:scale-110 mx-2 p-2 font-bold"
          onClick={() => setVisibility((res) => !res)}
        >
          X
        </span>
        <span className="p-2 mx-2">Edit profile</span>
        <span
          onClick={handleProfileUpdate}
          className="px-4 py-1 m-2 border border-slate-600 rounded-xl hover:scale-105"
        >
          save
        </span>
      </div>
      <div className="">
        <label className="flex justify-center gap-2 border-[1px] rounded-lg my-2 p-2 font-bold items-center">
          {imageData.res.image ? (
            <img
              src={imgSrc}
              alt="Selected Image"
              className="w-[100px] h-[100px] rounded-[100px] my-2 hover:cursor-pointer"
              onClick={() => ref.current?.click()}
            />
          ) : (
            <div className="rounded-[50%] flex justify-center items-center text-center w-[100px] bg-gray-200 h-[100px]">
              <span className="text-4xl text-slate-600 font-bold ">
                {data.username.slice(0, 1).toUpperCase()}
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
      </div>

      <label className="flex flex-col border p-5 justify-center items-start rounded-md gap-1">
        <span className="">Username</span>
        <input
          className="outline-none border-b-[1px] py-1 border-b-slate-700 bg-transparent"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <div className="text-red-600">
        {res && res.length > 0 ? "error occured" : null}
      </div>
      <div className="text-green-600">
        {res && res.length <= 0 ? "updated successfully" : null}
      </div>
    </div>
  );
};

export default EditModal;
