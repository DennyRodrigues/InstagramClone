import { BASE_API_URL } from "@/constants/Envs";
import { PostRequest } from "@/types/post";
import axios from "axios";

const API_URL = `${BASE_API_URL}/api/v1/post`;

const getPosts = async () => {
  try {
    return await axios.get(`${API_URL}`);
  } catch (e) {
       throw e;
  }
};


const createPost = async (post: PostRequest) => {
  try {
    return await axios.post(`${API_URL}`, post);
  } catch (e) {
       throw e;
  }
};

export const postService = { getPosts, createPost };
