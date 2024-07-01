import CustomError from "@/config/CustomError";
import axios from "axios"



  
const API_URL = "http://192.168.1.72:8080/api/v1/auth";
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
