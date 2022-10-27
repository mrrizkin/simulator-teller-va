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

export const Inquiry = z.object({
  nomorVA: z.string().default("0"),
  nomorIdentitas: z.string().default("0"),
  kodeInstansi: z.string().default("0"),
  kodeProduk: z.string().default("0"),
  kodeKantorTx: z.string().default("0"),
  kodeBank: z.string().default("0"),
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

export const Payment = z.object({
  nomorVA: z.string().default("0"),
  nominalVA: z.string().default("0"),
  kodeTransaksi: z.string().default("0"),
  kodeKantorTx: z.string().default("K"),
  kodeBank: z.string().default("0"),
});

export const FundTransfer = z.object({
  transDateTime: z.string(),
  fromAccount: z.string(),
  nominal: z.string(),
  nomorVA: z.string(),
  keterangan: z.string(),
});

export const Balance = z.object({
  rekening: z.string().default("0"),
  nominal: z.string().default("0"),
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
  jenisTransaksi: z.string(),
  balanceRequest: Balance,
  balanceResponse: ResponseStatus,
  inquiryRequest: Inquiry,
  inquiryResponse: InquiryResponse,
  paymentVARequest: Payment,
  paymentVAResponse: ResponseStatus,
  fundTransferRequest: FundTransfer,
  fundTransferResponse: ResponseStatus,
});

export type Data = z.infer<typeof Data>;
export type State = z.infer<typeof State>;
export type Balance = z.infer<typeof Balance>;
export type Inquiry = z.infer<typeof Inquiry>;
export type InquiryResponse = z.infer<typeof InquiryResponse>;
export type Payment = z.infer<typeof Payment>;
export type FundTransfer = z.infer<typeof FundTransfer>;
export type ResponseStatus = z.infer<typeof ResponseStatus>;

export type Dispatcher = {
  next: () => void;
  back: () => void;
  reset: () => void;
  setStep: (step: number) => void;
  setExternalToken: (token: string) => void;
  setInternalToken: (token: string) => void;
  setLoading: (loading: boolean) => void;
  setBalanceRequest: (balanceRequest: Balance) => void;
  setBalanceResponse: (balanceResponse: ResponseStatus) => void;
  setJenisID: (jenisID: number) => void;
  setNoIdentitas: (noIdentitas: string) => void;
  setNoVA: (noVA: string) => void;
  setKodeInstansi: (kodeInstansi: string) => void;
  setKodeProduk: (kodeProduk: string) => void;
  setKodeKantorTx: (kodeKantorTx: string) => void;
  setKodeBank: (kodeBank: string) => void;
  setModeTransaksi: (modeTransaksi: string) => void;
  setJenisTransaksi: (jenisTransaksi: string) => void;
  setInquiryResponse: (inquiryResponse: InquiryResponse) => void;
  setPaymentVARequest: (paymentVARequest: Payment) => void;
  setPaymentVAResponse: (responseStatus: ResponseStatus) => void;
  setFundTransferRequest: (fundTransferRequest: FundTransfer) => void;
  setFundTransferResponse: (responseStatus: ResponseStatus) => void;
  toggleDebug: () => void;
};

export type Action = {
  type: string;
  payload: any;
};
