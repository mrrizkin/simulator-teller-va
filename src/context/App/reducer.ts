import { Action, State } from "./types";

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
    case "NEXT":
      if (draft.step >= draft.maxStep) return;
      if (draft.internalToken === "") return;
      if (draft.externalToken === "") return;
      draft.step = draft.step + 1;
      return;
    case "BACK":
      if (draft.step <= 1) return;
      if (draft.internalToken === "") return;
      if (draft.externalToken === "") return;
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
    case "SET_MODE_TRANSAKSI":
      draft.modeTransaksi = action.payload;
    case "SET_FUNDTRANSFER_REQUEST":
      draft.fundTransferRequest = action.payload;
      return;
    case "SET_FUNDTRANSFER_RESPONSE":
      draft.fundTransferResponse = action.payload;
      return;
    case "SET_LOADING":
      draft.loading = action.payload;
      return;
    case "SET_EXTERNAL_TOKEN":
      draft.externalToken = action.payload;
      return;
    case "SET_INTERNAL_TOKEN":
      draft.internalToken = action.payload;
      return;
    case "SET_STEP":
      draft.step = action.payload;
      return;
    case "TOGGLE_DEBUG":
      draft.debug = !draft.debug;
      return;
    default:
      return;
  }
};

export default reducer;
