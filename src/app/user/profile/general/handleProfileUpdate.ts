import { handleProfileEdit } from "./handleProfileChange";


export async function handleProfileUpdate({ username, cover = false, formFile, cookies, setResponse }: { cover?: boolean; setResponse: React.Dispatch<React.SetStateAction<any>>; username?: string; formFile?: FormData; cookies: string }) {
  let response = await handleProfileEdit({
    username,
    imageData: formFile,
    cover,
    cookies: cookies,
  });
  setResponse(response);

  setTimeout(() => {
    setResponse(undefined);
  }, 1000);
}


