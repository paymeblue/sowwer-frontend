import { useSelector } from "react-redux";
import { selectCurrentUser } from "redux/auth/selectors";

const useUserAuth = () => {
  const currentUser = useSelector(selectCurrentUser);

  return {
    user: currentUser,
    isAuthenticated: currentUser?.id ? true : false,
  };
};

export default useUserAuth;
