import { useSelector } from "react-redux";

const useAuth = (): boolean => {
  return useSelector((state: any) => state.auth.isAuthenticated);
};

export default useAuth;
