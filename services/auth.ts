import axios, { AxiosError } from "axios"



  
const API_URL = "192.168.1.72/api/v1/auth/";
const register = async (email: string, password: string) => {
  try {
    return await axios.post(`${API_URL}/register`)
  }
  catch (e) {
    console.log(e)
  }
};

const login = async (email: string, password: string) => {
  try {
    return await axios.get(`http://192.168.1.72:8080/api/v1/ping`);
    return await axios.post(`${API_URL}/authenticate`, {email, password});
  } catch  {
  }
};

export const authService = { register, login }
