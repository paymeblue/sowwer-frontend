import {
  selectLastVisited,
  selectedCallbackString,
  selectedProjectId,
} from "@store/reducers/utilSlice";
import { useMemo } from "react";
import { useTypedSelector } from "./useStore";

export const useUtil = () => {
  const projectId = useTypedSelector(selectedProjectId);
  const callbackString = useTypedSelector(selectedCallbackString);
  const lastVisitedString = useTypedSelector(selectLastVisited);
  return useMemo(() => {
    return { projectId, callbackString, lastVisitedString };
  }, [projectId, callbackString, lastVisitedString]);
};
