
export interface PostRequest {
  description: string;
  images: string[];
}
export interface PostResponse extends PostRequest {
  authorUsername: string;
  authorProfile: string;
  id?: string;
  likesCount: number;
}
