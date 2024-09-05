
export interface PostRequest {
  description: string;
  images: string[];
}
export interface PostResponse extends PostRequest {
  authorUsername: string;
  authorProfile: string;
  id: number;
  likesCount: number;
}


export type onGetPostsFlags = {
  loadOldPosts: boolean;
};
