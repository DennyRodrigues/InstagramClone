export interface PostRequest {
  authorUsername: string;
  authorProfile: string;
  description: string;
  images: string[];
}

export interface PostResponse extends PostRequest {
  id?: string;
  likesCount: number;
}
