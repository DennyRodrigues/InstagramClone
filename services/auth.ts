import CustomError from "@/config/CustomError";
import { BASE_API_URL } from "@/constants/Envs";
import axios from "axios"



  
const API_URL = `${BASE_API_URL}/api/v1/auth`;
const register = async (email: string, password: string) => {
  try {
    return await axios.post(`${API_URL}/register`)
  }
  catch (e) {
     throw (e)
  }
};

const login = async (email: string, password: string) => {
  try {
    return await axios.post(`${API_URL}/authenticate`, { email, password });
  } catch (e) {
    throw e;
  }
};

export const authService = { register, login }
