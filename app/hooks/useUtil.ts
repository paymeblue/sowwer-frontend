import {
  selectedCallbackString,
  selectedProjectId,
} from "@store/reducers/utilSlice";
import { useMemo } from "react";
import { useTypedSelector } from "./useStore";

export const useUtil = () => {
  const projectId = useTypedSelector(selectedProjectId);
  const callbackString = useTypedSelector(selectedCallbackString);
  return useMemo(() => {
    return { projectId, callbackString };
  }, [projectId, callbackString]);
};
