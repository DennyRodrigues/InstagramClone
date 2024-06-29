import axios from "axios";

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
          alert(
            `Login failed: ${error.response.data.message || "Unknown error"}`
          );
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
      console.log('error message');
      console.log(error?.message);

      return {
        success: false,
        message: error?.message,
        status: error?.response.status,
      };
    }
  );
};
