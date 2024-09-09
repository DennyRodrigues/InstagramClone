import { BASE_API_URL } from "@/constants/Envs";
import { onGetPostsFlags, PostRequest } from "@/types/post";
import axios from "axios";

const API_URL_POST = `${BASE_API_URL}/api/v1/post`;

const API_URL_VIEWED = `${BASE_API_URL}/api/v1/viewed/post`;

const getPosts = async (flags?: onGetPostsFlags) => {
  try {
    return await axios.get(`${API_URL_POST}?viewed=${flags?.loadOldPosts || false}`);
  } catch (e) {
    throw e;
  }
};

const createPost = async (post: PostRequest) => {
  try {
    return await axios.post(`${API_URL_POST}`, post);
  } catch (e) {
    throw e;
  }
};

const markPostAsViewed = async (listOfPosts: number[]) => {
  try {
    
    return await axios.post(`${API_URL_VIEWED}`, { items: listOfPosts });
  } catch (e) {
    throw e;
  }
};

export const postService = {
  getPosts,
  createPost,
  markPostAsViewed,
};
