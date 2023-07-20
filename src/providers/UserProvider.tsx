import {
  userFailure,
  userLoading,
  userLogin,
} from "@/redux/features/user/userSlice";
import { useAppDispatch } from "@/redux/hooks";
import authService from "@/services/AuthService";
import LayoutProps from "@/types/LayoutProps";
import { useEffect } from "react";

const UserProvider = ({ children }: LayoutProps) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    (async () => {
      try {
        dispatch(userLoading());
        const { auth, message } = await authService.currentUser();
        if (!auth) {
          throw new Error(message);
        }
        dispatch(userLogin(auth));
      } catch (error) {
        dispatch(userFailure((error as Error).message));
      }
    })();
  }, [dispatch]);

  return children;
};

export default UserProvider;
