import { FundTransfer, Inquiry, Payment } from "../context/App/types";

import { number } from "./random";

type InquiryRequest = Inquiry & { stan?: string; rrn?: string };

export const inquiry = async (data: Inquiry) => {
  let request: InquiryRequest = Inquiry.parse(data);
  request.stan = number(6);
  request.rrn = number(12);
  return request;
};

type PaymentRequest = Payment & { stan?: string; rrn?: string };

export const payment = async (data: Payment) => {
  let request: PaymentRequest = Payment.parse(data);
  request.stan = number(6);
  request.rrn = number(12);
  return request;
};

type FundTransferRequest = FundTransfer & {
  stan?: string;
  rrn?: string;
};

export const fundTransfer = async (data: FundTransfer) => {
  let reqeust: FundTransferRequest = FundTransfer.parse(data);
  reqeust.stan = number(6);
  reqeust.rrn = number(12);
  return reqeust;
};
