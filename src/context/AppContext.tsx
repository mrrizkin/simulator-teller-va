import { useContext, ReactNode, createContext } from "react";
import { z } from "zod";
import { useImmerReducer } from "use-immer";

const Data = z.object({
  noVA: z.string(),
  rekSumber: z.string(),
  rekSumberFee: z.string(),
  namaProduk: z.string(),
  kodeTransaksi: z.string(),
  jenisTransaksi: z.string(),
  nominalVA: z.string(),
  nominalFee: z.string(),
});

const State = z.object({
  debug: z.boolean().default(true),
  maxStep: z.number().default(2),
  step: z.number().default(1),
  loading: z.boolean().default(true),
  jenisID: z.number(),
  noIdentitas: z.string().default(""),
  data: z.array(Data),
});

type Data = z.infer<typeof Data>;
type State = z.infer<typeof State>;

type Dispatcher = {
  next: () => void;
  back: () => void;
  reset: () => void;
  setLoading: (loading: boolean) => void;
  setData: (data: Data[]) => void;
  setJenisID: (jenisID: number) => void;
  setNoIdentitas: (noIdentitas: string) => void;
};

const AppContextState = createContext<State | null>(null);
const AppContextDispatch = createContext<Dispatcher | null>(null);

interface Action {
  type: string;
  payload: any;
}

const reducer = (draft: State, action: Action) => {
  switch (action.type) {
    case "JENIS_ID":
      draft.jenisID = action.payload;
      return;
    case "NO_IDENTITAS":
      draft.noIdentitas = action.payload;
      return;
    case "NEXT":
      if (draft.step >= draft.maxStep) return;
      draft.step = draft.step + 1;
      return;
    case "BACK":
      if (draft.step <= 1) return;
      draft.step = draft.step - 1;
      return;
    case "RESET":
      draft.step = 1;
      draft.jenisID = 1;
      draft.noIdentitas = "";
      return;
    case "SET_DATA":
      draft.data = action.payload;
      return;
    case "SET_LOADING":
      draft.loading = action.payload;
      return;
    default:
      return;
  }
};

interface Props {
  children: ReactNode;
}

const initialState: State = {
  debug: true,
  maxStep: 2,
  step: 1,
  loading: true,
  jenisID: 1,
  noIdentitas: "",
  data: [],
};

export const AppContextProvider = (props: Props) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const dispatcher: Dispatcher = {
    setJenisID: (jenisID: number) =>
      dispatch({ type: "JENIS_ID", payload: jenisID }),
    setNoIdentitas: (noIdentitas: string) =>
      dispatch({ type: "NO_IDENTITAS", payload: noIdentitas }),
    setData: (data: Data[]) => dispatch({ type: "SET_DATA", payload: data }),
    setLoading: (loading: boolean) =>
      dispatch({ type: "SET_LOADING", payload: loading }),
    next: () => dispatch({ type: "NEXT", payload: null }),
    back: () => dispatch({ type: "BACK", payload: null }),
    reset: () => dispatch({ type: "RESET", payload: null }),
  };

  return (
    <AppContextDispatch.Provider value={dispatcher}>
      <AppContextState.Provider value={state}>
        {props.children}
      </AppContextState.Provider>
    </AppContextDispatch.Provider>
  );
};

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
