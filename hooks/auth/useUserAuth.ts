"use client";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "redux/auth/reducer";
import {
  selectAccessToken,
  selectAuthContext,
  selectCurrentUser,
} from "redux/auth/selectors";
import api from "services/api/apiSlice";

const useUserAuth = () => {
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectAccessToken);
  const context = useSelector(selectAuthContext);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(
      setCredentials({
        user: null,
        token: null,
        refreshToken: null,
        context: null,
      })
    );
    dispatch(api.util.resetApiState());
  };

  return {
    user: currentUser,
    isAuthenticated: currentUser?.id ? true : false,
    logout,
    token,
    context,
  };
};

export default useUserAuth;
