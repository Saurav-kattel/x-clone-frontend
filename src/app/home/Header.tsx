"use client";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProfileImage } from "../redux/features/profileImageSlice";
import { getUserData } from "../redux/features/userSlice";
import { AppDispatch, RootState } from "../redux/app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { handleCreateTweet } from "./handleCreateTweet";

const Header = ({ cookie }: { cookie: string }) => {
  const [formFile, setFormFile] = useState<FormData>();
  const [imgSrc, setImgSrc] = useState<any>();
  const [content, setContent] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const [response, setResponse] = useState<any>();



  const { loading: profileImgLoading, res: profileImgRes } = useSelector(
    (state: RootState) => state.profileImg
  );

  const { res: userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!profileImgRes) {
      setTimeout(() => {
        dispatch(getProfileImage({ cookie }));
      }, 600)
    }
    if (!userData) {
      dispatch(getUserData({ cookie }));
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
    }
  }, [isOpen]);

  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event?.target.files && event.target.files[0];
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
  }
  return (
    <div>
      {profileImgRes?.status !== 200 && profileImgRes?.status !== 404 ? (
        <div className="flex h-[90vh] w-[58vw] justify-center font-bold items-center text-red-600">Error: {profileImgRes?.res.message}</div>
      ) : profileImgLoading ? (
        "Loading..."
      ) : (
        <div className="border-b-[0.5px]  border-t-[0.5px] py-2 my-2 box-border flex flex-row gap-2 items-center justify-start">
          {profileImgRes.res.image ? (
            <div className="flex items-center p-2 justify-start ">
              <img
                height={100}
                width={100}
                className="w-[70px] h-[70px] rounded-full bg-contain object-fit"
                src={`data:image/jpeg;base64,${profileImgRes.res.image}`}
              />
            </div>
          ) : (
            <div className="rounded-[50%] flex justify-center items-center text-center w-[70px] bg-gray-200 h-[70px]">
              <span className="text-4xl text-slate-600 font-bold">
                {userData?.res.username.slice(0, 1).toUpperCase()}
              </span>
            </div>
          )}

          {isOpen ? (
            <div
              className={`flex justify-center 15vh p-2 items-start gap-1 flex-col`}
            >
              <textarea
                ref={inputRef}
                value={content}
                onChange={(e) => {
                  setContent(e.target.value);
                }}
                className="bg-transparent outline-none border-none p-2 min-h-[60px] w-[50vw] resize-none"
                placeholder="What's on your mind"
              />

              <input
                type="file"
                onChange={(e) => handleFileChange(e)}
                ref={fileRef}
                hidden
              />

              <div className="flex w-[50vw] border-t-[0.3px]  justify-between py-2">
                <div>
                  <FontAwesomeIcon
                    onClick={() => fileRef.current?.click()}
                    className="hover:cursor-pointer hover:scale-110 p-2"
                    icon={faImage}
                  />
                </div>
                <button
                  onClick={async () => {
                    let res = await handleCreateTweet({ form: formFile, content: content, token: cookie })
                    if (res.status == 200) {
                      setContent("")
                      setImgSrc(undefined)
                      setFormFile(undefined)
                    }
                    setResponse(res)

                    setTimeout(() => {
                      setResponse(undefined)
                    }, 2000)
                  }}
                  className="bg-blue-700 px-4 py-1 rounded-lg hover:scale-110">
                  Post
                </button>
              </div>
              <div className="flex flex-col p-2  ">
                {imgSrc && (
                  <div>
                    <span
                      className="font-semibold hover:cursor-pointer text-xl"
                      onClick={() => {
                        setImgSrc(undefined);
                        setFormFile(undefined);
                      }}
                    >
                      <FontAwesomeIcon icon={faX} />
                    </span>

                    <img
                      src={imgSrc}
                      alt="Selected Image"
                      className="w-[100px] h-[100px] my-2 "
                    />
                  </div>

                )}
              </div>
              {(response && response.stauts != 200) ? <div className="text-red-600">{response.res.message}</div> : null}
              {(response && response.stauts === 200) ? <div className="text-green-600">success</div> : null}
            </div>
          ) : (
            <>
              <div onClick={toggleIsOpen}>What's on your mind?</div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default Header;
