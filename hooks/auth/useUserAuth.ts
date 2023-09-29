import { useSelector, useDispatch } from "react-redux";
import { setCredentials } from "redux/auth/reducer";
import { selectCurrentUser, selectAccessToken } from "redux/auth/selectors";

const useUserAuth = () => {
  const currentUser = useSelector(selectCurrentUser);
  const token = useSelector(selectAccessToken);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(
      setCredentials({
        user: null,
        token: null,
        refreshToken: null,
      })
    );
  };

  return {
    user: currentUser,
    isAuthenticated: currentUser?.id ? true : false,
    logout,
    token,
  };
};

export default useUserAuth;
