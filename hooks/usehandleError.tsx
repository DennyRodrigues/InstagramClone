import CustomError, { CustomErrorType } from "@/config/CustomError";
import { useAuth } from "@/providers/auth";


const isCustomErrorType = (error: unknown): error is CustomErrorType => {
  return error instanceof CustomError
};

export const useHandleError = () => {
  const { onLogout } = useAuth();
  const onHandleError = (error: unknown) => {
    // Only handle errors that have status code, otherwise return nothing 
    if (!isCustomErrorType(error)) {
      console.log(error);
      return;
    };
    if (error.status === 403) {
      onLogout();
    };
  }
  return { onHandleError };
}

