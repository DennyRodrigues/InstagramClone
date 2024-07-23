import { BASE_API_URL } from "@/constants/Envs";
import { PostRequest } from "@/types/post";
import axios from "axios";

const API_URL = `${BASE_API_URL}/api/v1/user`;

const getProfile = async (username: string) => {
  try {
    return await axios.get(`${API_URL}/${username}`);
  } catch (e) {
    throw e;
  }
};

export const profileService = { getProfile };
