import { BASE_API_URL } from "@/constants/Envs";
import { PostRequest } from "@/types/post";
import axios from "axios";

const API_URL = `${BASE_API_URL}/api/v1/follow`;

const addFollow = async (id: number) => {
  try {
    return await axios.post(`${API_URL}/${id}`);
  } catch (e) {
    throw e;
  }
};

export const FollowService = { addFollow };
