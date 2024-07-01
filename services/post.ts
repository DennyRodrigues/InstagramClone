import { PostRequest } from "@/types/post";
import axios from "axios";

const API_URL = "http://192.168.1.72:8080/api/v1/post";

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
