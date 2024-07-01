import { AuthContext, AuthContextProvider, useAuth } from "@/providers/auth";
import { authService } from "@/services/auth";
import axios from "axios";
import CustomError from "./CustomError";

export const handleGlobalError = () => {
  axios.interceptors.response.use(
    (res) => {
      return res;
    },
    (error) => {
      if (axios.isAxiosError(error)) {
        // Axios error with a response
        if (error.response) {
          console.error(
            "Server responded with a status:",
            error.response.status
          );
          console.error("Response data:", error.response.data);

        }
        // Axios error without a response
        else if (error.request) {
          console.error("No response received:", error.request);
        }
        // Axios error in setting up the request
        else {
          console.error("Error setting up the request:", error.message);
        }
      } else {
        // Non-Axios error
        console.error("Unexpected error:", error);
      }
      console.log('throw it')
       throw new CustomError(error?.message, error?.response?.status,);
    }
  );
};
