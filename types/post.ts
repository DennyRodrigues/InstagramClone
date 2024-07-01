export interface PostRequest {
  description: string;
  images: [string];
}

export interface PostResponse extends PostRequest {
  id?: string;
  likesCount: number;
}
