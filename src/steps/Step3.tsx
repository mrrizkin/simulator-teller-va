import { ChangeEvent, FormEvent, useState } from "react";
import {
  useAppState,
  useAppDispatch,
  InquiryResponse,
  ResponseStatus,
} from "../context/AppContext";
import { rupiah } from "../helpers/formatters";

import Status from "./Status";

const Step3 = () => {
  const { inquiryRequest, inquiryResponse, paymentVARequest, request } =
    useAppState();
  const { back, next, setLoading, setPaymentVARequest, setPaymentVAResponse } =
    useAppDispatch();
  const [selectedPayment, setSelectedPayment] = useState("0");

  let response = InquiryResponse.safeParse(inquiryResponse);
  let failedResponse = ResponseStatus.safeParse(inquiryResponse);

  function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
    setSelectedPayment(e.currentTarget.value);
  }

  function isSelected(value: string) {
    return selectedPayment === value;
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    if (response.success) {
      setPaymentVARequest({
        nomorVA:
          response.data.additionalData[parseInt(selectedPayment)].nomorVA,
        nominalVA:
          response.data.additionalData[parseInt(selectedPayment)].nominalVA,
        kodeTransaksi:
          response.data.additionalData[parseInt(selectedPayment)].kodeTransaksi,
        kodeKantorTx: inquiryRequest.kodeKantorTx,
        kodeBank: inquiryRequest.kodeBank,
        stan: inquiryRequest.stan,
        rrn: inquiryRequest.rrn,
      });

      request
        .post("/external/paymentVA", paymentVARequest)
        .then((res: any) => {
          setTimeout(() => {
            setPaymentVAResponse(res.data);
            setLoading(false);
            next();
          }, 1500);
        })
        .catch((e: any) => {
          setTimeout(() => {
            console.warn(e);
            setLoading(false);
          }, 1500);
        });
    } else {
      setTimeout(() => {
        console.warn("Can't submit if inquiry response is invalid");
        setLoading(false);
      }, 1500);
    }
  }

  return (
    <div className="p-8 max-w-3xl w-full">
      {response.success ? (
        <form onSubmit={handleSubmit}>
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>:</td>
                <td>{response.data.namaVA}</td>
              </tr>
              <tr>
                <td>Identity</td>
                <td>:</td>
                <td>{response.data.nomorIdentitas}</td>
              </tr>
              <tr>
                <td>Virtual Account</td>
                <td>:</td>
                <td>{response.data.nomorVA}</td>
              </tr>
              <tr>
                <td>Total Nominal</td>
                <td>:</td>
                <td>{rupiah(parseInt(response.data.nominalTotal))}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex gap-4 flex-wrap justify-center my-4">
            {response.data.additionalData.map((data, index) => (
              <div key={index}>
                <label className="relative">
                  <input
                    name="plan"
                    className="absolute top-0 right-0 checked:sibling:border-blue-500 outline-none opacity-0"
                    type="radio"
                    value={index}
                    checked={isSelected(index.toString())}
                    onChange={handleRadioChange}
                  />

                  <span className="flex flex-col p-4 cursor-pointer rounded-md border-3 select-none border-gray-500 w-72">
                    <span className="text-sm text-gray-300">
                      {data.nomorVA}
                    </span>
                    <span className="font-bold text-lg">{data.namaProduk}</span>
                    <span className="font-bold text-2xl">
                      {rupiah(parseInt(data.nominalVA))}
                    </span>
                    <span className="text-sm text-gray-300">
                      fee {rupiah(parseInt(data.nominalFee))}
                    </span>
                    <div className="flex flex-col gap-x-2 mt-4">
                      <span className="text-xs font-bold text-gray-500">
                        SRC {data.rekeningSumber}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        SRC Fee {data.rekeningFeeSumber}
                      </span>
                      <span className="text-xs font-bold text-gray-500">
                        TRX {data.kodeTransaksi}
                      </span>
                    </div>
                    <span
                      className={`absolute top-0 right-0 ${
                        isSelected(index.toString())
                          ? "bg-blue-500"
                          : "bg-gray-500"
                      } px-2 py-1 rounded-tr-md rounded-bl-md text-xs`}
                    >
                      {data.jenisTransaksi}
                    </span>
                  </span>
                </label>
              </div>
            ))}
          </div>
          <table className="text-xs text-gray-500">
            <tbody>
              <tr>
                <td>Status</td>
                <td>:</td>
                <td>{response.data.status}</td>
              </tr>
              <tr>
                <td>Message</td>
                <td>:</td>
                <td>{response.data.message}</td>
              </tr>
              <tr>
                <td>stan</td>
                <td>:</td>
                <td>{response.data.stan}</td>
              </tr>
              <tr>
                <td>rrn</td>
                <td>:</td>
                <td>{response.data.rrn}</td>
              </tr>
            </tbody>
          </table>
          <button
            type="button"
            onClick={back}
            className="bg-gray-500 text-white mr-4 rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
          >
            Back
          </button>
          <input
            type="submit"
            value="Next"
            className="bg-blue-500 text-white rounded-md mt-4 px-8 py-2 outline-none focus:border-blue-500"
          />
        </form>
      ) : (
        failedResponse.success && <Status {...failedResponse.data} />
      )}
    </div>
  );
};

export default Step3;
