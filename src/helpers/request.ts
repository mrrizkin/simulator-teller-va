import axios from "axios";
import { Balance, FundTransfer, Inquiry, Payment } from "../context/App/types";

import { number } from "./random";

type InquiryRequest = Inquiry & { stan?: string; rrn?: string };

export const inquiry = async (data: Inquiry) => {
  let request: InquiryRequest = Inquiry.parse(data);
  request.stan = number(6);
  request.rrn = number(12);
  return request;
};

type PaymentRequest = Payment & { stan?: string; rrn?: string };

export const payment = async (data: Payment, token: string) => {
  let request: PaymentRequest = Payment.parse(data);
  request.stan = number(6);
  request.rrn = number(12);
  return axios.post(
    `${import.meta.env.VITE_API_EXTERNAL}/external/paymentVA`,
    request,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

type FundTransferRequest = FundTransfer & {
  stan?: string;
  rrn?: string;
};

export const fundTransfer = async (data: FundTransfer, token: string) => {
  let request: FundTransferRequest = FundTransfer.parse(data);
  request.stan = number(6);
  request.rrn = number(12);
  return axios.post(
    `${import.meta.env.VITE_API_INTERNAL}/fundtransfer`,
    request,
    {
      headers: { Authorization: `Bearer ${token}` },
    }
  );
};

export const addBalance = async (data: Balance, token: string) => {
  return axios.post(`${import.meta.env.VITE_API_INTERNAL}/addbalance`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export const subBalance = async (data: Balance, token: string) => {
  return axios.post(`${import.meta.env.VITE_API_INTERNAL}/subbalance`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
