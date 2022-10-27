import { Dispatch } from "react";
import {
  Action,
  Dispatcher,
  FundTransfer,
  InquiryResponse,
  Payment,
  ResponseStatus,
} from "./types";

const dispatcher = (dispatch: Dispatch<Action>): Dispatcher => {
  function setJenisID(jenisID: number) {
    dispatch({ type: "JENIS_ID", payload: jenisID });
  }

  function setNoIdentitas(noIdentitas: string) {
    dispatch({ type: "NO_IDENTITAS", payload: noIdentitas });
  }

  function setNoVA(noVA: string) {
    dispatch({ type: "NO_VA", payload: noVA });
  }

  function setKodeBank(kodeBank: string) {
    dispatch({ type: "KODE_BANK", payload: kodeBank });
  }

  function setBalanceRequest(balanceRequest: any) {
    dispatch({ type: "SET_BALANCE_REQUEST", payload: balanceRequest });
  }

  function setBalanceResponse(balanceResponse: ResponseStatus) {
    dispatch({ type: "SET_BALANCE_RESPONSE", payload: balanceResponse });
  }

  function setKodeInstansi(kodeInstansi: string) {
    dispatch({ type: "KODE_INSTANSI", payload: kodeInstansi });
  }

  function setKodeKantorTx(kodeKantorTx: string) {
    dispatch({ type: "KODE_KANTOR_TX", payload: kodeKantorTx });
  }

  function setKodeProduk(kodeProduk: string) {
    dispatch({ type: "KODE_PRODUK", payload: kodeProduk });
  }

  function setLoading(loading: boolean) {
    dispatch({ type: "SET_LOADING", payload: loading });
  }

  function setInternalToken(token: string) {
    dispatch({ type: "SET_INTERNAL_TOKEN", payload: token });
  }

  function setExternalToken(token: string) {
    dispatch({ type: "SET_EXTERNAL_TOKEN", payload: token });
  }

  function setInquiryResponse(inquiryResponse: InquiryResponse) {
    dispatch({ type: "SET_INQUIRY_RESPONSE", payload: inquiryResponse });
  }

  function setPaymentVARequest(paymentVARequest: Payment) {
    dispatch({ type: "SET_PAYMENTVA_REQUEST", payload: paymentVARequest });
  }

  function setPaymentVAResponse(responseStatus: ResponseStatus) {
    dispatch({ type: "SET_PAYMENTVA_RESPONSE", payload: responseStatus });
  }

  function setModeTransaksi(modeTransaksi: string) {
    dispatch({ type: "SET_MODE_TRANSAKSI", payload: modeTransaksi });
  }

  function setJenisTransaksi(jenisTransaksi: string) {
    dispatch({ type: "SET_JENIS_TRANSAKSI", payload: jenisTransaksi });
  }

  function setFundTransferRequest(fundTransferRequest: FundTransfer) {
    dispatch({
      type: "SET_FUNDTRANSFER_REQUEST",
      payload: fundTransferRequest,
    });
  }

  function setFundTransferResponse(responseStatus: ResponseStatus) {
    dispatch({ type: "SET_FUNDTRANSFER_RESPONSE", payload: responseStatus });
  }

  function next() {
    dispatch({ type: "NEXT", payload: null });
  }

  function back() {
    dispatch({ type: "BACK", payload: null });
  }

  function reset() {
    dispatch({ type: "RESET", payload: null });
  }

  function setStep(step: number) {
    dispatch({ type: "SET_STEP", payload: step });
  }

  function toggleDebug() {
    dispatch({ type: "TOGGLE_DEBUG", payload: null });
  }

  return {
    setJenisID,
    setNoIdentitas,
    setNoVA,
    setKodeBank,
    setKodeInstansi,
    setKodeKantorTx,
    setKodeProduk,
    setLoading,
    setInternalToken,
    setJenisTransaksi,
    setBalanceResponse,
    setBalanceRequest,
    setExternalToken,
    setInquiryResponse,
    setPaymentVARequest,
    setPaymentVAResponse,
    setModeTransaksi,
    setFundTransferRequest,
    setFundTransferResponse,
    next,
    back,
    setStep,
    reset,
    toggleDebug,
  };
};

export default dispatcher;
