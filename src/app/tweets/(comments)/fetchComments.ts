import React, { SetStateAction } from "react";
import { getAllComments } from "../(ts)/getAllComments";
import { CommentResponseData, getUserComment } from "../(ts)/getUserComments";

type Props = {
	tweetId: string;
	token: string;
	pageNumber: number;
	visibility: "ALL" | "USER";
	setShouldFetch: React.Dispatch<SetStateAction<boolean>>;
	refresh: boolean;
	setPageNumber: React.Dispatch<SetStateAction<number>>
	setData: React.Dispatch<SetStateAction<CommentResponseData['res']>>
}
export const fetchComments = async ({ refresh, setShouldFetch, setPageNumber, pageNumber, setData, tweetId, token, visibility }: Props) => {
	try {

		let res;
		if (visibility === "USER") {
			res = await getUserComment({ tweetId, token, pageNumber, pageSize: 6 });
		} else {
			res = await getAllComments({ tweetId, pageNumber, pageSize: 6 });
		}

		if (!res?.res || res.res.length === 0) {
			setShouldFetch(false);
			return;
		}


		if (refresh) {
			setData(res.res)
		} else {
			setData((prev) => [...prev, ...res.res]);
		}
		// Avoid duplicates
		if (res.res.length < 6) {
			setShouldFetch(false);
		} else {
			setPageNumber((num) => num + 1)
		}
	} catch (e: any) {
		console.error(e.message);
	}
};


