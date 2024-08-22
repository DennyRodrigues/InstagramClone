import { BASE_API_URL } from "@/constants/Envs";
import axios from "axios";

const API_URL = `${BASE_API_URL}/api/v1/user`;

const getProfile = async (username: string) => {
  try {
    return await axios.get(`${API_URL}/${username}`);
  } catch (e) {
    throw e;
  }
};

const saveNotificationToken = async (notificationToken: string) => {
  try {
    return await axios.post(`${API_URL}/notificationToken`, notificationToken);
  } catch (e) {
    throw e;
  }
};

export const profileService = { getProfile, saveNotificationToken };
