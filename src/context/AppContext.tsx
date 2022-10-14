import { useContext, ReactNode, createContext } from "react";
import { z } from "zod";
import { useImmerReducer } from "use-immer";

const Data = z.object({
  nomorVA: z.string(),
  rekeningFeeSumber: z.string(),
  namaProduk: z.string(),
  kodeTransaksi: z.string(),
  rekeningSumber: z.string(),
  nominalFee: z.string(),
  nominalVA: z.string(),
  jenisTransaksi: z.string(),
});

export const InquiryRequest = z.object({
  nomorVA: z.string().default("0"),
  nomorIdentitas: z.string().default("0"),
  kodeInstansi: z.string().default("0"),
  kodeProduk: z.string().default("0"),
  kodeKantorTx: z.string().default("0"),
  kodeBank: z.string().default("0"),
  stan: z.string().default("210595"),
  rrn: z.string().default("110480000001"),
});

export const InquiryResponse = z.object({
  nomorVA: z.string(),
  stan: z.string(),
  nominalTotal: z.string(),
  nomorIdentitas: z.string(),
  jumlahData: z.string(),
  additionalData: z.array(Data),
  message: z.string(),
  namaVA: z.string(),
  status: z.string(),
  rrn: z.string(),
});

const State = z.object({
  debug: z.boolean().default(true),
  token: z.string().default(""),
  maxStep: z.number().default(2),
  step: z.number().default(1),
  loading: z.boolean().default(true),
  jenisID: z.number(),
  inquiryResponse: InquiryResponse,
  inquiryRequest: InquiryRequest,
});

type Data = z.infer<typeof Data>;
type State = z.infer<typeof State>;
type InquiryRequest = z.infer<typeof InquiryRequest>;
type InquiryResponse = z.infer<typeof InquiryResponse>;

type Dispatcher = {
  next: () => void;
  back: () => void;
  reset: () => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setJenisID: (jenisID: number) => void;
  setNoIdentitas: (noIdentitas: string) => void;
  setNoVA: (noVA: string) => void;
  setInquiryResponse: (inquiryResponse: InquiryResponse) => void;
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
      draft.inquiryRequest.nomorIdentitas = action.payload;
      return;
    case "NO_VA":
      draft.inquiryRequest.nomorVA = action.payload;
      return;
    case "NEXT":
      if (draft.step >= draft.maxStep) return;
      if (draft.token === "") return;
      draft.step = draft.step + 1;
      return;
    case "BACK":
      if (draft.step <= 1) return;
      if (draft.token === "") return;
      draft.step = draft.step - 1;
      return;
    case "RESET":
      draft.step = 1;
      draft.jenisID = 1;
      draft.inquiryRequest.nomorVA = "";
      draft.inquiryRequest.nomorIdentitas = "";
      return;
    case "SET_INQUIRY_RESPONSE":
      draft.inquiryResponse = action.payload;
      return;
    case "SET_LOADING":
      draft.loading = action.payload;
      return;
    case "SET_TOKEN":
      draft.token = action.payload;
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
  token: "",
  maxStep: 3,
  step: 1,
  loading: true,
  jenisID: 1,
  inquiryRequest: InquiryRequest.parse({ nomorVA: "", nomorIdentitas: "" }),
  inquiryResponse: {
    nomorVA: "",
    stan: "",
    nominalTotal: "",
    nomorIdentitas: "",
    jumlahData: "",
    additionalData: [],
    message: "",
    namaVA: "",
    status: "",
    rrn: "",
  },
};

export const AppContextProvider = (props: Props) => {
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const dispatcher: Dispatcher = {
    setJenisID: (jenisID: number) =>
      dispatch({ type: "JENIS_ID", payload: jenisID }),
    setNoIdentitas: (noIdentitas: string) =>
      dispatch({ type: "NO_IDENTITAS", payload: noIdentitas }),
    setNoVA: (noVA: string) => dispatch({ type: "NO_VA", payload: noVA }),
    setLoading: (loading: boolean) =>
      dispatch({ type: "SET_LOADING", payload: loading }),
    setToken: (token: string) =>
      dispatch({ type: "SET_TOKEN", payload: token }),
    setInquiryResponse: (inquiryResponse: InquiryResponse) =>
      dispatch({ type: "SET_INQUIRY_RESPONSE", payload: inquiryResponse }),
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
