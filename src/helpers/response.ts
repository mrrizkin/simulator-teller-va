import { InquiryResponse } from "../context/App";

export const inquiry = async (data: any) => {
  let response = InquiryResponse.safeParse(data);
  if (response.success) {
    return response.data;
  }
  return response.error;
};

export const payment = async (data: any) => {
  let response = InquiryResponse.safeParse(data);
  if (response.success) {
    return response.data;
  }
  return response.error;
};

export const fundTransfer = async (data: any) => {
  let response = InquiryResponse.safeParse(data);
  if (response.success) {
    return response.data;
  }
  return response.error;
};
