"use client";
import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "redux/auth/reducer";
import { selectCurrentUser, selectAccessToken } from "redux/auth/selectors";
import api from "services/api/apiSlice";

const useUserAuth = () => {
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  const logout = async () => {
    await dispatch(
      setCredentials({
        user: null,
        token: null,
        refreshToken: null,
      })
    );
    await dispatch(api.util.resetApiState());
  };

  return {
    user: currentUser,
    isAuthenticated: currentUser?.id ? true : false,
    logout,
    token,
  };
};

export default useUserAuth;
