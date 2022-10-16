import { useContext, ReactNode, createContext } from "react";
import { z } from "zod";
import { useImmerReducer } from "use-immer";
import Request from "../helpers/request";

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

export const PaymentVARequest = z.object({
  nomorVA: z.string().default("0"),
  nominalVA: z.string().default("0"),
  kodeTransaksi: z.string().default("0"),
  kodeKantorTx: z.string().default("K"),
  kodeBank: z.string().default("0"),
  stan: z.string().default("210595"),
  rrn: z.string().default("110480000001"),
});

export const ResponseStatus = z.object({
  message: z.string(),
  status: z.string(),
});

const State = z.object({
  debug: z.boolean().default(true),
  token: z.string().default(""),
  maxStep: z.number().default(2),
  step: z.number().default(1),
  loading: z.boolean().default(true),
  jenisID: z.number(),
  inquiryRequest: InquiryRequest,
  inquiryResponse: InquiryResponse,
  paymentVARequest: PaymentVARequest,
  paymentVAResponse: ResponseStatus,
  request: z.instanceof(Request),
});

type Data = z.infer<typeof Data>;
type State = z.infer<typeof State>;
type InquiryRequest = z.infer<typeof InquiryRequest>;
type InquiryResponse = z.infer<typeof InquiryResponse>;
type PaymentVARequest = z.infer<typeof PaymentVARequest>;
type ResponseStatus = z.infer<typeof ResponseStatus>;

type Dispatcher = {
  next: () => void;
  back: () => void;
  reset: () => void;
  setToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setJenisID: (jenisID: number) => void;
  setNoIdentitas: (noIdentitas: string) => void;
  setNoVA: (noVA: string) => void;
  setKodeInstansi: (kodeInstansi: string) => void;
  setKodeProduk: (kodeProduk: string) => void;
  setKodeKantorTx: (kodeKantorTx: string) => void;
  setKodeBank: (kodeBank: string) => void;
  setStan: (stan: string) => void;
  setRrn: (rrn: string) => void;
  setInquiryResponse: (inquiryResponse: InquiryResponse) => void;
  setPaymentVARequest: (paymentVARequest: PaymentVARequest) => void;
  setPaymentVAResponse: (responseStatus: ResponseStatus) => void;
  toggleDebug: () => void;
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
    case "KODE_BANK":
      draft.inquiryRequest.kodeBank = action.payload;
      return;
    case "KODE_PRODUK":
      draft.inquiryRequest.kodeProduk = action.payload;
      return;
    case "KODE_INSTANSI":
      draft.inquiryRequest.kodeInstansi = action.payload;
      return;
    case "KODE_KANTOR_TX":
      draft.inquiryRequest.kodeKantorTx = action.payload;
      return;
    case "STAN":
      draft.inquiryRequest.stan = action.payload;
      return;
    case "RRN":
      draft.inquiryRequest.rrn = action.payload;
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
      window.location.reload();
      return;
    case "SET_INQUIRY_RESPONSE":
      draft.inquiryResponse = action.payload;
      return;
    case "SET_PAYMENTVA_REQUEST":
      draft.paymentVARequest = action.payload;
      return;
    case "SET_PAYMENTVA_RESPONSE":
      draft.paymentVAResponse = action.payload;
      return;
    case "SET_LOADING":
      draft.loading = action.payload;
      return;
    case "SET_TOKEN":
      draft.token = action.payload;
      draft.request.setToken(action.payload);
      return;
    case "TOGGLE_DEBUG":
      draft.debug = !draft.debug;
      return;
    default:
      return;
  }
};

interface Props {
  children: ReactNode;
}

const initialState: State = {
  debug: false,
  token: "",
  maxStep: 4,
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
  paymentVARequest: PaymentVARequest.parse({ nomorVA: "", nominalVA: "" }),
  paymentVAResponse: {
    message: "",
    status: "",
  },
  request: new Request(""),
};

export const AppContextProvider = (props: Props) => {
  // @ts-ignore: this is fine :')
  const [state, dispatch] = useImmerReducer(reducer, initialState);

  const dispatcher: Dispatcher = {
    setJenisID: (jenisID: number) =>
      dispatch({ type: "JENIS_ID", payload: jenisID }),
    setNoIdentitas: (noIdentitas: string) =>
      dispatch({ type: "NO_IDENTITAS", payload: noIdentitas }),
    setNoVA: (noVA: string) => dispatch({ type: "NO_VA", payload: noVA }),
    setKodeBank: (kodeBank: string) =>
      dispatch({ type: "KODE_BANK", payload: kodeBank }),
    setKodeInstansi: (kodeInstansi: string) =>
      dispatch({ type: "KODE_INSTANSI", payload: kodeInstansi }),
    setKodeKantorTx: (kodeKantorTx: string) =>
      dispatch({ type: "KODE_KANTOR_TX", payload: kodeKantorTx }),
    setKodeProduk: (kodeProduk: string) =>
      dispatch({ type: "KODE_PRODUK", payload: kodeProduk }),
    setRrn: (rrn: string) => dispatch({ type: "RRN", payload: rrn }),
    setStan: (stan: string) => dispatch({ type: "STAN", payload: stan }),
    setLoading: (loading: boolean) =>
      dispatch({ type: "SET_LOADING", payload: loading }),
    setToken: (token: string) =>
      dispatch({ type: "SET_TOKEN", payload: token }),
    setInquiryResponse: (inquiryResponse: InquiryResponse) =>
      dispatch({ type: "SET_INQUIRY_RESPONSE", payload: inquiryResponse }),
    setPaymentVARequest: (paymentVARequest: PaymentVARequest) =>
      dispatch({ type: "SET_PAYMENTVA_REQUEST", payload: paymentVARequest }),
    setPaymentVAResponse: (paymentVAResponse: ResponseStatus) =>
      dispatch({ type: "SET_PAYMENTVA_RESPONSE", payload: paymentVAResponse }),
    next: () => dispatch({ type: "NEXT", payload: null }),
    back: () => dispatch({ type: "BACK", payload: null }),
    reset: () => dispatch({ type: "RESET", payload: null }),
    toggleDebug: () => dispatch({ type: "TOGGLE_DEBUG", payload: null }),
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
