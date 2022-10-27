import { Inquiry, Payment, State } from "./types";
import { number } from "../../helpers/random";

const initialState: State = {
  debug: false,
  externalToken: "",
  internalToken: "",
  maxStep: 5,
  step: 1,
  loading: true,
  jenisID: 1,
  modeTransaksi: "1",
  inquiryRequest: Inquiry.parse({ nomorVA: "", nomorIdentitas: "" }),
  inquiryResponse: {
    nomorVA: "",
    nominalTotal: "",
    nomorIdentitas: "",
    jumlahData: "",
    additionalData: [],
    message: "",
    namaVA: "",
    status: "",
    stan: number(6),
    rrn: number(12),
  },
  paymentVARequest: Payment.parse({ nomorVA: "", nominalVA: "" }),
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
  },
  fundTransferResponse: {
    message: "",
    status: "",
  },
};

export default initialState;
