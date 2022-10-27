import { InquiryRequest, PaymentVARequest, State } from "./types";

const initialState: State = {
  debug: false,
  externalToken: "",
  internalToken: "",
  maxStep: 5,
  step: 1,
  loading: true,
  jenisID: 1,
  modeTransaksi: "1",
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
  fundTransferRequest: {
    transDateTime: Date.now().toString(),
    fromAccount: "",
    nominal: "",
    nomorVA: "",
    keterangan: "pembayaran",
    stan: "010595",
    rrn: "010480000001",
  },
  fundTransferResponse: {
    message: "",
    status: "",
  },
};

export default initialState;
