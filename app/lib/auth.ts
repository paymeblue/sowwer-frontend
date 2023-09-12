import { useTypedSelector } from "@hooks/useStore";
import {
  selectCurrentUser,
  selectCurrentUserToken,
} from "@store/reducers/authSlice";
import { useMemo } from "react";

export const Auth = () => {
  const user = useTypedSelector(selectCurrentUser);
  const userToken = useTypedSelector(selectCurrentUserToken);
  const isAuth = !!userToken;
  return useMemo(() => {
    return { user, isAuth };
  }, [user, isAuth]);
};
