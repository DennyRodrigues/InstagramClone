import { BASE_API_URL } from "@/constants/Envs";
import { LikesType } from "@/types/likes";
import { PostRequest } from "@/types/post";
import axios from "axios";

const API_URL = `${BASE_API_URL}/api/v1/likes`;

const addLike = async (type: LikesType, id: string) => {
  try {
    return await axios.post(`${API_URL}/${type}/${id}`);
  } catch (e) {
    throw e;
  }
};

const removeLike = async (type: LikesType, id: string) => {
  try {
    return await axios.post(`${API_URL}/${type}/${id}`);
  } catch (e) {
    throw e;
  }
};
export const postService = { addLike, removeLike };
