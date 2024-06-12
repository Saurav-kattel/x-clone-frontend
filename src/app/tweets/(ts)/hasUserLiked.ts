export interface TweetLikedUser {
  userId: string;
  username: string;
  like_id: string;
};


export function hasUserLiked({ data, userId }: { data: TweetLikedUser[] | null | undefined; userId: string | undefined }): boolean {
  if (data === null || data === undefined) {
    return false;
  }
  return data.some(elm => elm.userId === userId);
}

