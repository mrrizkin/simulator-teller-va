import { useContext } from "react";
import { AppContextState, AppContextDispatch } from "./provider";

export const useAppState = () => {
  const context = useContext(AppContextState);
  if (!context) {
    throw new Error("useAppState must be used within a AppContextProvider");
  }
  return context;
};

export const useAppDispatch = () => {
  const context = useContext(AppContextDispatch);
  if (!context) {
    throw new Error("useAppDispatch must be used within a AppContextProvider");
  }
  return context;
};
