import { ChangeEvent, FormEvent, useState } from "react";

import { useAppState, useAppDispatch } from "../context/App";

import { TextInput, Label } from "../components/Input";
import HackButton from "../components/HackButton";
import Show from "../components/Show";

import { currency, onlydigit, virtual_account } from "../helpers/masking";
import { getPaymentToken } from "../helpers/auth";
import {
  addBalance,
  fundTransfer,
  payment,
  subBalance,
} from "../helpers/request";

const Step4 = () => {
  const [showFormDetail, setShowFormDetail] = useState(true);
  const {
    modeTransaksi,
    jenisTransaksi,
    balanceRequest,
    paymentVARequest,
    externalToken,
    internalToken,
    fundTransferRequest,
  } = useAppState();
  const {
    next,
    back,
    setPaymentVARequest,
    setInquiryResponse,
    setPaymentVAResponse,
    setFundTransferRequest,
    setFundTransferResponse,
    setBalanceRequest,
    setBalanceResponse,
    setLoading,
    setInternalToken,
  } = useAppDispatch();

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setPaymentVARequest({
      ...paymentVARequest,
      nominalVA: onlydigit(e.currentTarget.value),
    });
    setBalanceRequest({
      ...balanceRequest,
      nominal: onlydigit(e.currentTarget.value),
    });
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (parseInt(paymentVARequest.nominalVA) <= 0) {
      alert("Nominal VA should be greater than 0");
      return;
    }
    if (paymentVARequest.nominalVA === "") {
      alert("Nominal VA can't be empty");
    }

    setLoading(true);
    makeRequest();
  }

  function makeRequest() {
    payment(paymentVARequest, externalToken)
      .then((res: any) => {
        if (jenisTransaksi === "D") {
          fundTransfer(fundTransferRequest, internalToken)
            .then((response) => {
              setTimeout(() => {
                setPaymentVAResponse(res.data);
                setInquiryResponse(res.data);
                setFundTransferResponse(response.data);
                setLoading(false);
                next();
              }, 1500);
            })
            .catch((e: any) => {
              setTimeout(() => {
                setPaymentVAResponse(res.data);
                setInquiryResponse(res.data);
                console.warn(e);
                alert("Fund Transfer fee failed");
                setLoading(false);
                next();
              }, 1500);
            });
          subBalance(balanceRequest, internalToken)
            .then((response) => {
              setTimeout(() => {
                setPaymentVAResponse(res.data);
                setInquiryResponse(res.data);
                setBalanceResponse(response.data);
                setLoading(false);
                next();
              }, 1500);
            })
            .catch((e: any) => {
              setTimeout(() => {
                setPaymentVAResponse(res.data);
                setInquiryResponse(res.data);
                console.warn(e);
                alert("Add balance failed");
                setLoading(false);
                next();
              }, 1500);
            });
        } else {
          addBalance(balanceRequest, internalToken)
            .then((response) => {
              setTimeout(() => {
                setPaymentVAResponse(res.data);
                setInquiryResponse(res.data);
                setBalanceResponse(response.data);
                setLoading(false);
                next();
              }, 1500);
            })
            .catch((e: any) => {
              setTimeout(() => {
                setPaymentVAResponse(res.data);
                setInquiryResponse(res.data);
                console.warn(e);
                alert("Add balance failed");
                setLoading(false);
                next();
              }, 1500);
            });
        }
      })
      .catch((e: any) => {
        setTimeout(() => {
          console.warn(e);
          alert("Payment VA failed");
          setLoading(false);
        }, 1500);
      });
  }

  function toggleFormDetail() {
    setShowFormDetail(!showFormDetail);
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl w-full">
      <Label className="text-xl">[Input Nominal]</Label>
      <TextInput
        value={currency(paymentVARequest.nominalVA)}
        onChange={handleChange}
        disabled={modeTransaksi === "1"}
        className={`border-3 border-gray-500 p-2 ${
          modeTransaksi === "1" ? "opacity-50 bg-gray-700" : ""
        }`}
      />
      <Show when={showFormDetail}>
        <div className="text-gray-400 mt-4">
          <div className="flex gap-8 py-4">
            <div className="flex-1">
              <Label>[VA Number]</Label>
              <TextInput
                value={virtual_account(fundTransferRequest.nomorVA)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFundTransferRequest({
                    ...fundTransferRequest,
                    nomorVA: onlydigit(e.currentTarget.value),
                  })
                }
                className="border-3 border-gray-500 p-1"
              />
            </div>
            <div className="flex-1">
              <Label>[Fee]</Label>
              <TextInput
                value={currency(fundTransferRequest.nominal)}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFundTransferRequest({
                    ...fundTransferRequest,
                    nominal: onlydigit(e.currentTarget.value),
                  })
                }
                className="border-3 border-gray-500 p-1"
              />
            </div>
          </div>
          <div className="flex gap-8 py-4">
            <div className="flex-1">
              <Label>[From Account]</Label>
              <TextInput
                value={fundTransferRequest.fromAccount}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFundTransferRequest({
                    ...fundTransferRequest,
                    fromAccount: e.currentTarget.value,
                  })
                }
                className="border-3 border-gray-500 p-1"
              />
            </div>
            <div className="flex-1">
              <Label>[Detail]</Label>
              <TextInput
                value={fundTransferRequest.keterangan}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setFundTransferRequest({
                    ...fundTransferRequest,
                    keterangan: e.currentTarget.value,
                  })
                }
                className="border-3 border-gray-500 p-1"
              />
            </div>
          </div>
        </div>
      </Show>
      <div className="text-xs mt-4 flex gap-x-2 items-center">
        <input
          type="checkbox"
          name="showFormDetail"
          id="showFormDetail"
          onChange={toggleFormDetail}
          checked={showFormDetail}
        />
        <label htmlFor="showFormDetail">Show Form Detail</label>
      </div>
      <HackButton
        type="button"
        onClick={back}
        className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
      >
        Back
      </HackButton>
      <HackButton
        type="submit"
        className="bg-blue-500 text-white rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
      >
        Next
      </HackButton>
    </form>
  );
};

export default Step4;
