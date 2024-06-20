"use client";
import React, { Suspense, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserData } from "../redux/features/userSlice";
import { AppDispatch, RootState } from "../redux/app/store";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faX,
} from "@fortawesome/free-solid-svg-icons";
import { handleCreateTweet } from "./handleCreateTweet";
import ProfileImage from "./ProfileImage";
import Spinner from "@/lib/Spinner";
import SelectVisibilityComponent from "./SelectVisComponent";



interface TextAreaProp {
  content: string | undefined;
  setContent: React.Dispatch<React.SetStateAction<string | undefined>>
  isOpen: boolean;
}

function TextArea({ content, setContent, isOpen }: TextAreaProp) {
  const ref = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    if (isOpen) {
      ref.current?.focus();
    }
  }, [isOpen]);


  return <>
    <textarea
      ref={ref}
      value={content}
      onChange={(e) => {
        setContent(e.target.value);
      }}
      className="bg-transparent border-b-[0.5px] border-white outline-none p-2 min-h-[60px] w-[30vw] resize-none"
      placeholder="What's on your mind"
    />
  </>
}


interface ImageViewComponentProps {
  imgSrc: string;
  setImgSrc: React.Dispatch<React.SetStateAction<string | undefined>>
  setFormFile: React.Dispatch<React.SetStateAction<FormData | undefined>>
}

function ImageViewComponent({ imgSrc, setImgSrc, setFormFile }: ImageViewComponentProps) {
  return <div className="flex flex-col p-2  ">
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

}

export type VisType = "private" | "public" | "followers"

interface FileInputComponentProps {
  setImgSrc: React.Dispatch<React.SetStateAction<string | ArrayBuffer | null>>
  setFormFile: React.Dispatch<React.SetStateAction<FormData | undefined>>
}

function FileInuptComponent({ setFormFile, setImgSrc }: FileInputComponentProps) {
  const fileRef = useRef<HTMLInputElement>(null);
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
  return <>
    <input
      type="file"
      onChange={(e) => handleFileChange(e)}
      ref={fileRef}
      accept="image/png,image/jpg, image/jpeg"
      hidden
    />

    <div className="flex  justify-between py-2">
      <FontAwesomeIcon
        onClick={() => fileRef.current?.click()}
        className="hover:cursor-pointer text-xl hover:scale-110 p-2"
        icon={faImage}
      />
    </div>
  </>
}

const Header = ({ cookie }: { cookie: string }) => {
  const [formFile, setFormFile] = useState<FormData>();
  const [imgSrc, setImgSrc] = useState<any>();
  const [content, setContent] = useState<string>();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [response, setResponse] = useState<any>();
  const [visibility, setVisibility] = useState<VisType>("public");

  const { res: userData } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getUserData({ cookie }));
  }, [])

  const toggleIsOpen = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  async function handlePostButtonClick() {
    let res = await handleCreateTweet({ form: formFile, content: content, token: cookie, vis: visibility })
    if (res.status == 200) {
      setContent("")
      setImgSrc(undefined)
      setFormFile(undefined)
    }

    setResponse(res)

    setTimeout(() => {
      setResponse(undefined)
    }, 2000)
  }
  return (
    <div>
      <div className="flex gap-2 justify-around items-end">

      </div>
      <div className="border-b-[0.5px]  border-t-[0.5px] py-2 my-2 box-border flex flex-row gap-2 items-center justify-start">
        <Suspense fallback={<Spinner />} >
          <ProfileImage cookie={cookie} username={userData?.res.username} />
        </Suspense>
        {isOpen ? (
          <div
            className={`flex justify-center w-[30vw] 15vh p-2 items-start gap-1 flex-col`}
          >
            <TextArea isOpen={isOpen} content={content} setContent={setContent} />
            <div className="flex justify-center items-center ">
              <FileInuptComponent setImgSrc={setImgSrc} setFormFile={setFormFile} />
              <SelectVisibilityComponent visibility={visibility} setVisibility={setVisibility} />
            </div>
            <button
              onClick={handlePostButtonClick}
              className="bg-blue-700 px-4 py-1 rounded-lg hover:scale-110">
              Post
            </button>

            <ImageViewComponent setFormFile={setFormFile} setImgSrc={setImgSrc} imgSrc={imgSrc} />
            {(response && response.stauts != 200) ? <div className="text-red-600">{response.res.message}</div> : null}
            {(response && response.stauts === 200) ? <div className="text-green-600">success</div> : null}
          </div>
        ) : (
          <>
            <div onClick={toggleIsOpen}>What's on your mind?</div>
          </>
        )
        }
      </div >
    </div >
  );
};

export default Header;
