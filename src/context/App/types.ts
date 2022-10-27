import { z } from "zod";

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

export const FundTransferRequest = z.object({
  transDateTime: z.string(),
  fromAccount: z.string(),
  nominal: z.string(),
  nomorVA: z.string(),
  keterangan: z.string(),
  stan: z.string(),
  rrn: z.string(),
});

export const ResponseStatus = z.object({
  message: z.string(),
  status: z.string(),
});

const State = z.object({
  debug: z.boolean().default(true),
  internalToken: z.string().default(""),
  externalToken: z.string().default(""),
  maxStep: z.number().default(5),
  step: z.number().default(1),
  loading: z.boolean().default(true),
  jenisID: z.number(),
  modeTransaksi: z.string(),
  inquiryRequest: InquiryRequest,
  inquiryResponse: InquiryResponse,
  paymentVARequest: PaymentVARequest,
  paymentVAResponse: ResponseStatus,
  fundTransferRequest: FundTransferRequest,
  fundTransferResponse: ResponseStatus,
});

export type Data = z.infer<typeof Data>;
export type State = z.infer<typeof State>;
export type InquiryRequest = z.infer<typeof InquiryRequest>;
export type InquiryResponse = z.infer<typeof InquiryResponse>;
export type PaymentVARequest = z.infer<typeof PaymentVARequest>;
export type FundTransferRequest = z.infer<typeof FundTransferRequest>;
export type ResponseStatus = z.infer<typeof ResponseStatus>;

export type Dispatcher = {
  next: () => void;
  back: () => void;
  reset: () => void;
  setStep: (step: number) => void;
  setExternalToken: (token: string) => void;
  setInternalToken: (token: string) => void;
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
  setModeTransaksi: (modeTransaksi: string) => void;
  setInquiryResponse: (inquiryResponse: InquiryResponse) => void;
  setPaymentVARequest: (paymentVARequest: PaymentVARequest) => void;
  setPaymentVAResponse: (responseStatus: ResponseStatus) => void;
  setFundTransferRequest: (fundTransferRequest: FundTransferRequest) => void;
  setFundTransferResponse: (responseStatus: ResponseStatus) => void;
  toggleDebug: () => void;
};

export type Action = {
  type: string;
  payload: any;
};
