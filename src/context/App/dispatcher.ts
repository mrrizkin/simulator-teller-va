import { Dispatch } from "react";
import {
  Action,
  Dispatcher,
  FundTransferRequest,
  InquiryResponse,
  PaymentVARequest,
  ResponseStatus,
} from "./types";

const dispatcher = (dispatch: Dispatch<Action>): Dispatcher => ({
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
  setExternalToken: (token: string) =>
    dispatch({ type: "SET_EXTERNAL_TOKEN", payload: token }),
  setInternalToken: (token: string) =>
    dispatch({ type: "SET_INTERNAL_TOKEN", payload: token }),
  setInquiryResponse: (inquiryResponse: InquiryResponse) =>
    dispatch({ type: "SET_INQUIRY_RESPONSE", payload: inquiryResponse }),
  setPaymentVARequest: (paymentVARequest: PaymentVARequest) =>
    dispatch({ type: "SET_PAYMENTVA_REQUEST", payload: paymentVARequest }),
  setPaymentVAResponse: (paymentVAResponse: ResponseStatus) =>
    dispatch({ type: "SET_PAYMENTVA_RESPONSE", payload: paymentVAResponse }),
  setModeTransaksi: (modeTransaksi: string) =>
    dispatch({ type: "SET_MODE_TRANSAKSI", payload: modeTransaksi }),
  setFundTransferRequest: (fundTransferRequest: FundTransferRequest) =>
    dispatch({
      type: "SET_FUNDTRANSFER_REQUEST",
      payload: fundTransferRequest,
    }),
  setFundTransferResponse: (fundTransferResponse: ResponseStatus) =>
    dispatch({
      type: "SET_FUNDTRANSFER_RESPONSE",
      payload: fundTransferResponse,
    }),
  next: () => dispatch({ type: "NEXT", payload: null }),
  back: () => dispatch({ type: "BACK", payload: null }),
  setStep: (step: number) => dispatch({ type: "SET_STEP", payload: step }),
  reset: () => dispatch({ type: "RESET", payload: null }),
  toggleDebug: () => dispatch({ type: "TOGGLE_DEBUG", payload: null }),
});

export default dispatcher;
