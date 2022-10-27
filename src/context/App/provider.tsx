import { ReactNode, createContext } from "react";
import { useImmerReducer } from "use-immer";

import reducer from "./reducer";
import initialState from "./initial";
import dispatcher from "./dispatcher";
import { Dispatcher, State } from "./types";

export const AppContextState = createContext<State | null>(null);
export const AppContextDispatch = createContext<Dispatcher | null>(null);

interface Props {
  children: ReactNode;
}

export const AppContextProvider = (props: Props) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return (
    <AppContextDispatch.Provider value={dispatcher(dispatch)}>
      <AppContextState.Provider value={state}>
        {props.children}
      </AppContextState.Provider>
    </AppContextDispatch.Provider>
  );
};
