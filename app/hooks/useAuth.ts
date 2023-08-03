import { selectCurrentUser } from "@store/reducers/authSlice";
import { useMemo } from "react";
import { useTypedSelector } from "./useStore";

export const useAuth = () => {
  const user = useTypedSelector(selectCurrentUser);
  return useMemo(() => user, [user]);
};
