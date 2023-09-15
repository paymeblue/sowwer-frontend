import {
  selectCurrentUser,
  selectCurrentUserToken,
} from "store/reducers/authSlice";
import { useMemo } from "react";
import { useTypedSelector } from "./useStore";

export const useAuth = () => {
  const user = useTypedSelector(selectCurrentUser);
  const userToken = useTypedSelector(selectCurrentUserToken);

  return useMemo(() => {
    return { user, userToken }; // Return an object containing user and userToken
  }, [user, userToken]);
};
