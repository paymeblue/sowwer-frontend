import { selectedProjectId } from "@store/reducers/utilSlice";
import { useMemo } from "react";
import { useTypedSelector } from "./useStore";

export const useUtil = () => {
  const projectId = useTypedSelector(selectedProjectId);
  return useMemo(() => projectId, [projectId]);
};
